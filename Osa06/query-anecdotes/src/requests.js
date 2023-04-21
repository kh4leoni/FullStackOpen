import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
   return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = anecdote => {
   return axios.post(baseUrl, anecdote).then(res => res.data)
}

export const addVote = votedAnecdote => {
   return axios.put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote).then(res => res.data)
}
