import {createAnecdote} from '../reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'



const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.field.value
    e.target.field.value = ""
    dispatch(createAnecdote(content))
  }
  return(
  <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="field"/></div>
      <button type="submit">create</button>
    </form>
  </div>
  )
}

export default AnecdoteForm