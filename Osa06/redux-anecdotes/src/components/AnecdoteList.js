import {useDispatch, useSelector} from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  console.log(anecdotes)

  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()


  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )


  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  const vote = (id) => {
    anecdotes.map(anecdote => {
      if (anecdote.id === id) {
        dispatch(voteAnecdote(id, anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 10))
      }
    })

  }
  return(
  <div>
    {sortedAnecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
    )}
  </div>
  )
}

export default AnecdoteList
