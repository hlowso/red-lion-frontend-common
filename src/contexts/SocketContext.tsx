import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { Socket } from 'socket.io-client'
import { SOCKET_EVENTS, SocketPayload } from 'common'

const io = require('socket.io-client/dist/socket.io.js')

interface SocketInterface {
  identify: (payload: SocketPayload.Identify) => Socket
  notifications: SocketPayload.Notify[]
  setNotifications: React.Dispatch<React.SetStateAction<SocketPayload.Notify[]>>
}

const SocketContext = createContext<SocketInterface | undefined>(undefined)

export const useSocket = () => useContext(SocketContext)
export const SocketProvider = ({
  children,
  serverUrl
}: PropsWithChildren<{ serverUrl: string }>) => {
  const socket = io(serverUrl)
  const [notifications, setNotifications] = useState<SocketPayload.Notify[]>([])

  useEffect(() => {
    const onNotify = (payload: SocketPayload.Notify) =>
      setNotifications((N) => [...N, payload])

    socket.on(SOCKET_EVENTS.NOTIFY, onNotify)

    return () => {
      socket.off(SOCKET_EVENTS.NOTIFY, onNotify)
    }
  }, [])

  const identify = (payload: SocketPayload.Identify) =>
    socket.emit(SOCKET_EVENTS.IDENTIFY, payload)

  const value = {
    identify,
    notifications,
    setNotifications
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}
