import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 20,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  return (
    <div className="blog" id="blogs" style={blogStyle}>
      <Link to={`/blogs/${blog.id.toString()}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog
