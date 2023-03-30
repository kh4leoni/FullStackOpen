import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('')

  const blogFormRef = useRef(BlogForm)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs([...blogs]))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const addBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(addedBlog))
      setMessageColor('green')
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
        setMessageColor('')
      }, 5000)
      blogFormRef.current.toggleVisibility()
      fetchBlogs()
    } catch (error) {
      setMessage(error.response.data)
      setMessageColor('red')
      setTimeout(() => {
        setMessage(null)
        setMessageColor('')
      }, 5000)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)

    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}`
    )

    isConfirmed ? await blogService.remove(id) : console.log('not deleted')

    fetchBlogs()
    console.log(`${blog.title} deleted`)
  }

  const handleLogin = async (credentials) => {
    const { username, password } = credentials

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setMessage('wrong credentials')
      setMessageColor('red')
      setTimeout(() => {
        setMessage(null)
        setMessageColor('')
      }, 5000)
    }
  }

  const handleLike = async (id) => {
    console.log(`clicked ${id}`)

    try {
      const blog = blogs.find((b) => b.id === id)
      console.log(blog.likes)
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)))
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => {
    return <LoginForm handleLogin={handleLogin} />
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm currentBlog={addBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification message={message} color={messageColor} />
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>

          <p>
            {user.name} logged in
            <button id="logout" onClick={handleLogout}>
              logout
            </button>
          </p>

          {blogForm()}

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={() => handleLike(blog.id)}
              deleteBlog={() => deleteBlog(blog.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
