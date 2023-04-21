import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider} from 'react-query'
import {VoteContextProvider} from './VoteContext'
import {ErrorContextProvider} from './ErrorContext'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <ErrorContextProvider>
      <VoteContextProvider>
        <App />
      </VoteContextProvider>
    </ErrorContextProvider>
  </QueryClientProvider>
)