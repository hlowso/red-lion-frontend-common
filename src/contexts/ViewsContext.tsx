import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from 'react'
import { Context as UIContext } from './UIContext'
import Play from '../views/Play'
import { AppProps } from '../App'
import Journal from '../views/Journal'
import { usePlayContext } from './PlayContext'

type View = 'play' | 'journal'

interface Props extends PropsWithChildren {}
interface Context {
  view: View
  setView: (view: View) => void
}

export const ViewsContext = createContext<Context>({
  view: 'play',
  setView: () => {}
})

export const ViewsProvider = ({ children }: Props) => {
  const [view, setView] = useState<View>('play')

  const value = {
    view,
    setView
  }

  return <ViewsContext.Provider value={value}>{children}</ViewsContext.Provider>
}

export const View = (props: AppProps) => {
  const { view } = useContext(ViewsContext)
  const { isLoading } = usePlayContext()

  switch (view) {
    case 'play':
      return <Play {...props} />
    case 'journal':
      return <Journal />
  }
}
