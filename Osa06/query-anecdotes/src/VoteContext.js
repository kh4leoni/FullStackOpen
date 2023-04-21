import {createContext, useReducer} from 'react'

const voteReducer = (state, action) => {
  switch (action.type) {

    case "VOTE":
      state = `you voted ${action.payload.content}`
      return state
    case "HIDE":
      state = null
      return state
    default:
      return state
  }

}
  const VoteContext = createContext()


  export const VoteContextProvider = (props) => {
    const [vote, voteDispatch] = useReducer(voteReducer, null)

    return (
      <VoteContext.Provider value={[vote, voteDispatch]}>
        {props.children}
        </VoteContext.Provider>
    )
}

export default VoteContext