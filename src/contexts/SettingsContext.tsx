import React, { createContext, PropsWithChildren, useContext } from 'react'

interface Context {
  'tally-targets': boolean
}

const settings: Context = {
  'tally-targets': false
}

const SettingsContext = createContext<Partial<Context>>({})

export const Feature = ({
  name,
  children
}: PropsWithChildren<{ name: keyof Context }>) => {
  const settings = useContext(SettingsContext)
  return settings[name] ? (children as JSX.Element) : null
}

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}
