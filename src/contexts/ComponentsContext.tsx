import React, { createContext, PropsWithChildren } from 'react'

interface Context {
  Div: (props: PropsWithChildren<any>) => JSX.Element | null
  Span: (props: PropsWithChildren<any>) => JSX.Element | null
  Fark: () => JSX.Element | null
}

interface Props {
  children: React.ReactNode
  components: Context
}

export const ComponentsContext = createContext<Context>({
  Div: () => null,
  Span: () => null,
  Fark: () => null
})

export const ComponentProvider = ({ children, components }: Props) => {
  return (
    <ComponentsContext.Provider value={components}>
      {children}
    </ComponentsContext.Provider>
  )
}
