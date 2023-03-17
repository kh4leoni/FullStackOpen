const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Kuningattaren armoilla',
    author: "Tiina Tikkari",
    url: "http://royal.fi",
    likes: 40
  },
  {
    title: 'Liesipoliisi',
    author: "Super Marsu",
    url: "http://liesipoliisi.fi",
    likes: 24
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}