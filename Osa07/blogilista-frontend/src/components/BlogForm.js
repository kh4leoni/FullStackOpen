import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    try {
      dispatch(createBlog(newBlog))

      setTitle('')
      setAuthor('')
      setUrl('')

      dispatch(
        showNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          color: 'green',
        })
      )
      setTimeout(() => {
        dispatch(showNotification({ message: null, color: null }))
      }, 5000)
    } catch (error) {
      dispatch(showNotification({ message: error.response.data, color: 'red' }))
      setTimeout(() => {
        dispatch(showNotification({ message: null, color: null }))
      }, 5000)
    }
  }

  return (
    <Form onSubmit={addBlog}>
      <div>
        <h2>create new</h2>
      </div>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          id="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          id="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          id="url"
        />
      </div>

      <Button
        className="my-3"
        variant="secondary"
        size="sm"
        type="submit"
        id="send-button"
      >
        add
      </Button>
    </Form>
  )
}

export default BlogForm
