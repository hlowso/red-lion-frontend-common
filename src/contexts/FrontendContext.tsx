import React, { createContext, PropsWithChildren } from 'react'
import { Context as UIContext } from './UIContext'

interface Props extends PropsWithChildren {
  serverUrl?: string
  apiBaseUrl?: string
  components?: UIContext
}

export const FrontendContext = createContext<Props>({})
export const FrontendProvider = ({ children, ...props }: Props) => {
  return (
    <FrontendContext.Provider value={props}>
      {children}
    </FrontendContext.Provider>
  )
}
