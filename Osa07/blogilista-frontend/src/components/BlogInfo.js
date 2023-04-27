import {
  addCommentToBlog,
  deleteSelectedBlog,
  initializeBlogs,
  likeBlog,
} from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const { id } = useParams()
  const blog = blogs?.find((blog) => blog.id.toString() === id.toString())
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const [render, setRender] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [comment, dispatch])

  const deleteBlog = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}`
    )

    if (isConfirmed) {
      dispatch(deleteSelectedBlog(blog.id))
      console.log('Deleted')
      navigate('/')
    } else {
      console.log('Delete canceled')
    }
  }

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog?.likes + 1,
        user: { ...blog.user },
      }
      console.log('this is updatedBlog from BlogInfo', updatedBlog)
      dispatch(likeBlog(blog.id, updatedBlog))
    } catch (error) {
      console.log(error.message)
    }
  }

  const buttonStyle = {
    margin: 10,
  }

  const addComment = (e) => {
    e.preventDefault()
    dispatch(addCommentToBlog(blog.id, comment))
    setRender(true)
    setComment('')
  }

  return (
    <div>
      <div>
        <div>
          <h2>{blog?.title}</h2>
          <a href="#">{blog?.url}</a>
          <p>
            likes: {blog?.likes}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleLike(blog?.id.toString())}
              id="like"
            >
              like
            </Button>
          </p>

          <p>added by: {blog?.user.name}</p>

          <div id="remove-div">
            {user?.username === blog?.user.username ? (
              <Button
                variant="secondary"
                size="sm"
                id="delete-button"
                onClick={() => deleteBlog(blog.id)}
                style={buttonStyle}
              >
                remove
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
        <h2> comments: </h2>
        <form onSubmit={addComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="secondary" size="sm" type="submit">
            add comment
          </Button>
        </form>

        {blog?.comments.map((comment) => {
          return (
            <li
              key={`${
                comment +
                blog.comments.length +
                Math.floor(Math.random() * 100000)
              }`}
            >
              {comment}
            </li>
          )
        })}
      </div>
    </div>
  )
}

export default BlogInfo
