import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import {hasSelectionSupport} from '@testing-library/user-event/dist/utils'







const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {

    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      return state.map(anecdote =>
      anecdote.id === action.payload.id
      ? action.payload
      : anecdote
      )
    }
  }
})



export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id, anecdote)
    dispatch(addVote(updatedAnecdote))
  }
}



export default anecdoteSlice.reducer