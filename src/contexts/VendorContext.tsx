import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from 'react'

interface Context {
  shopping: boolean
  toggleShopping: () => void
}

const VendorContext = createContext<Context>({
  shopping: false,
  toggleShopping: () => {}
})

export const useVendorContext = () => useContext(VendorContext)
export const VendorProvider = ({ children }: PropsWithChildren) => {
  const [shopping, setShopping] = useState(false)
  const toggleShopping = () => setShopping(!shopping)

  const value: Context = {
    shopping,
    toggleShopping
  }
  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  )
}
