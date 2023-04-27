import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const { id } = useParams()
  const userToShow = users?.find((user) => user.id.toString() === id.toString())
  console.log(userToShow)

  return (
    <div>
      <h2>{userToShow?.name}</h2>
      <h4>added blogs</h4>
      {userToShow?.blogs.map((blog) => {
        return <li key={blog?.id}>{blog?.title}</li>
      })}
    </div>
  )
}

export default User
