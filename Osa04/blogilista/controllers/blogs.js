const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)

  if(!blog.title || !blog.url) {
    res.status(400).end()
  } else {
  const savedBlog = await blog.save()
    
  res.status(201).json(savedBlog)
    
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const blog = await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()

})

blogsRouter.put('/:id', async(req,res,next) => {
  const {title, author, url, likes} = req.body
  
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query'}
    )

    res.json(updatedBlog)
 
})

module.exports = blogsRouter
