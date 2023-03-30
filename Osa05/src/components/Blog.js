import { useState } from 'react'

const Blog = ({ blog, handleLike, deleteBlog, user }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    padding: 20,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  const buttonStyle = {
    margin: 10,
  }

  const showBlogInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className="blog" id="blogs" style={blogStyle}>
      {blog.title} {blog.author}
      <button id="view" style={buttonStyle} onClick={showBlogInfo}>
        {' '}
        {showInfo ? 'hide' : 'view'}{' '}
      </button>
      {showInfo ? (
        <div>
          <a href={blog.url}>{blog.url}</a>

          <p>
            likes: {blog.likes}
            <button onClick={handleLike} id="like">
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <div id="remove-div">
            {user.username === blog.user.username ? (
              <button
                id="delete-button"
                onClick={deleteBlog}
                style={buttonStyle}
              >
                remove
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
