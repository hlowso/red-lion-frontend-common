import React, { createContext, PropsWithChildren } from 'react'
import RequestHelpers, { Requests } from '../requests'
import { useSocket } from './SocketContext'

export const RequestsContext = createContext<Requests>({
  ...RequestHelpers('')
})

export const RequestsProvider = ({
  children,
  apiBaseUrl
}: PropsWithChildren<{ apiBaseUrl: string }>) => {
  const socketContext = useSocket()
  const value = RequestHelpers(apiBaseUrl, socketContext?.socketId)
  return (
    <RequestsContext.Provider key={socketContext?.socketId} value={value}>
      {children}
    </RequestsContext.Provider>
  )
}
