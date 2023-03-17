require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://markkukuki:${password}@fso.nr3vb1h.mongodb.net/testBlogi?retryWrites=true&w=majority`


mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'Kuningattaren armoilla',
  author: "Tiina Tikkari",
  url: "http://royal.fi",
  likes: 40
})


blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})


Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})

