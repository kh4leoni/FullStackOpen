import { useContext } from 'react'
import VoteContext from '../VoteContext'
import ErrorContext from '../ErrorContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5  }

  const [vote, dispatch] = useContext(VoteContext)
  const [error, dispatchError] = useContext(ErrorContext)

  return (
  <>
  {vote || error ? (
    <div style={style}>
      {vote ? vote : ""}
      {error ? error : ""}
    </div>
  ) : (
  ""
  ) }

  </>
  )
}

export default Notification