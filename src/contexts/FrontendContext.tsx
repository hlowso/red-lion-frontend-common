import React, { createContext, PropsWithChildren } from 'react'
import { Context as UIContext } from './UIContext'
import { BackendFactory } from 'dnd-core'

interface Props extends PropsWithChildren {
  serverUrl?: string
  apiBaseUrl?: string
  components?: UIContext
  dndBackend?: BackendFactory
  orientation: 'landscape' | 'portrait'
}

export const FrontendContext = createContext<Props>({
  orientation: 'landscape'
})

export const FrontendProvider = ({ children, ...props }: Props) => {
  return (
    <FrontendContext.Provider value={props}>
      {children}
    </FrontendContext.Provider>
  )
}
