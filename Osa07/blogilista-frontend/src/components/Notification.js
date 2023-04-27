import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector((state) => state.notification)

  if (notifications?.message === null) {
    return null
  }
  return (
    <div>
      <h1 className={notifications?.color}>{notifications?.message}</h1>
    </div>
  )
}

export default Notification
