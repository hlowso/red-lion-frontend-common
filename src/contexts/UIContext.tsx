import React, { createContext, PropsWithChildren, useContext } from 'react'
import { UI } from '../types/ui-components'

interface Context {
  Div: (props: PropsWithChildren<any>) => JSX.Element | null
  Span: (props: PropsWithChildren<any>) => JSX.Element | null
  Image: (props: UI.ImageProps) => JSX.Element | null
}

interface Props {
  children: React.ReactNode
  components: Context
}

const UIContext = createContext<Context>({
  Div: () => null,
  Span: () => null,
  Image: () => null
})

export const useUIContext = () => useContext(UIContext)
export const UIProvider = ({ children, components }: Props) => {
  return <UIContext.Provider value={components}>{children}</UIContext.Provider>
}
