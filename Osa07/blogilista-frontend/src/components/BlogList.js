import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ sortedBlogs, blogForm }) => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      {blogForm()}
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
