import React, { createContext, PropsWithChildren } from 'react'
import RequestHelpers, { Requests } from '../requests'

export const RequestsContext = createContext<Requests>({
  ...RequestHelpers('')
})

export const RequestsProvider = ({
  children,
  apiBaseUrl
}: PropsWithChildren<{ apiBaseUrl: string }>) => {
  const value = RequestHelpers(apiBaseUrl)
  return (
    <RequestsContext.Provider value={value}>
      {children}
    </RequestsContext.Provider>
  )
}
