const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const user = req.user

  console.log("tämä on käyttäjä", user)

  const userToSave = await User.findById(user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  if (!blog.title || !blog.url || !blog.author) {
    res.status(400).json('You must fill all fields').end()
  } else {
    const savedBlog = await blog.save()

    userToSave.blogs = userToSave.blogs.concat(savedBlog._id)
    await userToSave.save()

    res.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  const user = req.user

  if (!user || blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

  await user.save()
  await blog.remove()
  
  res.status(204).end()
})

// blogsRouter.delete('/:id', async (req, res, next) => {
//   const user = req.user
//   console.log(`this is body${req.body.id}`)

//   const blogToDelete = await Blog.findById(req.params.id)

//   if (blogToDelete === null) {
//     res.status(400).json({ error: 'no blog found' })
//   }

//   if (blogToDelete.user.toString() === user.id.toString()) {
//     await Blog.findByIdAndRemove(req.params.id)
//     res.status(204).end()
//   }
// })

blogsRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updatedBlog)
})

module.exports = blogsRouter
