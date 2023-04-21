import { createAnecdote } from '../requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import ErrorContext from '../ErrorContext'

const AnecdoteForm = () => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const queryClient = useQueryClient()

  let error, dispatch
  [error, dispatch] = useContext(ErrorContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5 ) {
      dispatch({type: "ERROR"})
      setTimeout(() => {
        dispatch({type: 'HIDE-ERROR'})
      }, 5000)
    } else {
      event.target.anecdote.value = ''
      console.log('new anecdote')
      newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
    }

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
