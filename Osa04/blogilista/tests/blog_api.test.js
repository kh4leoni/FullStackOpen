const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blog listings are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blog listings are returned', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returned blog id must be named id', async () => {
  const response = await api.get('/api/blogs/')
  const blogs = response.body
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('blogs can be added', async () => {
  const newBlog = {
    title: 'Kalamiehen Blog',
    author: 'Jaska Super',
    url: 'http://jaskankaakalassa.com',
    likes: 3,
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((b) => b.title)
  expect(titles).toContain('Kalamiehen Blog')
})

test('blog without likes will be set to likes: 0', async () => {
  const newBlog = {
    title: 'Kuusankosken kalliot',
    author: 'Simo Silmä',
    url: 'https://kuusankoskenkalliot.fi',
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('blog cannot be added without title', async () => {
  const newBlog = {
    author: 'Maikko Pitkänen',
    url: 'http://siikapelto.fi',
    likes: 5
  }

  await api.post('/api/blogs')
    .expect(400)

})

test('blog cannot be added without url', async() => {
  const newBlog = {
    title: "Testaajan blogi",
    author: "Teuvo Testaaja",
    likes: 5
  }

  await api.post('/api/blogs')
    .expect(400)
})

test('specific blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('specific blog can be updated', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: "Kuningattaren armoilla",
    author: "Tiina Tikkari",
    url: "http://royal.fi",
    likes: 510
  }

  await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(updatedBlog)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes)


})

afterAll(async () => {
  await mongoose.connection.close()
})
