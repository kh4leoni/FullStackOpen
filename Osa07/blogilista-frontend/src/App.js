import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import Users from './pages/Users'
import User from './pages/User'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList'
import axios from 'axios'
import BlogInfo from './components/BlogInfo'
import { Button, Navbar, NavLink } from 'react-bootstrap'

const App = () => {
  const blogFormRef = useRef(BlogForm)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('/api/users').then((res) => setUsers(res.data))
  }, [dispatch, user])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('this is user', user)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const handleLogin = async (credentials) => {
    const { username, password } = credentials

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(showNotification({ message: 'wrong credentials', color: 'red' }))

      setTimeout(() => {
        dispatch(showNotification({ message: null, color: null }))
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const loginForm = () => {
    return <LoginForm handleLogin={handleLogin} />
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    )
  }

  const Menu = () => {
    return (
      <Navbar bg="light" className="d-flex justify-content-evenly">
        <NavLink>
          <Link to="/users"> users</Link>
        </NavLink>
        <NavLink>
          <Link to="/blogs">blogs</Link>
        </NavLink>
        {user ? (
          <>
            <p className="mx-5">
              {user.name} logged in
              <Button
                className="mx-5"
                size="sm"
                variant="secondary"
                id="logout"
                onClick={handleLogout}
              >
                logout
              </Button>
            </p>
          </>
        ) : (
          ''
        )}
      </Navbar>
    )
  }

  return (
    <div className="container flex-column justify-content-center">
      <Notification />
      <Menu />
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <Routes>
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route
              path="/blogs"
              element={
                <BlogList sortedBlogs={sortedBlogs} blogForm={blogForm} />
              }
            />
            <Route path="/blogs/:id" element={<BlogInfo blog={blogs} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
