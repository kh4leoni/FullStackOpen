const _ = require('lodash')
const blog = require('../models/blog')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = blogs.reduce((acc, curr) => {
    return acc + curr.likes
  }, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((acc, curr) => {
    return (acc.likes > curr.likes ? acc : curr)
  }, {})
  return({
    title: mostLikes.title, 
    author: mostLikes.author, 
    likes: mostLikes.likes})
}

const mostBlogs = (blogs) => {
const bloggerStats = blogs.reduce((stats, blog) => {
  if(!stats[blog.author]) {
    stats[blog.author] = {
      author: blog.author,
      blogs: 0
    }
  }
  stats[blog.author].blogs += 1
  return stats
}, {})

 
  const BloggerWithMostBlogs = Object.values(bloggerStats).reduce((acc, curr) => acc.blogs > curr.blogs ? acc : curr)
  return BloggerWithMostBlogs
}

const mostLikes = (blogs) => {
  const bloggerStats = blogs.reduce((stats, blog) => {
    if(!stats[blog.author]) {
      stats[blog.author] = {
        author: blog.author,
        likes: 0
      }
   
    }
    stats[blog.author].likes += blog.likes
    return stats
  }, {})
  const bloggerWithMostLikes = Object.values(bloggerStats).reduce((acc, curr) => acc.likes > curr.likes ? acc : curr)
  console.log(bloggerWithMostLikes)
  return bloggerWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
