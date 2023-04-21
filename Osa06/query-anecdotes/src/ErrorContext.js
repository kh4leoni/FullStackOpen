import {createContext, useReducer} from 'react'

const errorReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      state = "Too short anecdote, must have length 5 or more"
      return state
    case "HIDE-ERROR":
      state = null
  }

}
const ErrorContext = createContext()


export const ErrorContextProvider = (props) => {
  const [error, errorDispatch] = useReducer(errorReducer, null)

  return (
  <ErrorContext.Provider value={[error, errorDispatch]}>
    {props.children}
  </ErrorContext.Provider>
  )
}

export default ErrorContext