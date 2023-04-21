import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, addVote } from './requests'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import VoteContext from './VoteContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const [vote, dispatch] = useContext(VoteContext)

  const updateAnecdoteMutation = useMutation(addVote, {
    onSuccess: async () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const result = useQuery('anecdotes', getAnecdotes, { retry: false})
  console.log(result)

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if (result.isLoading) {
    return <div>Loading...</div>
  }


  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: "VOTE", payload: anecdote})
    setTimeout(() => {
      dispatch({type: "HIDE"})
    }, 5000)

  }



  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default App
