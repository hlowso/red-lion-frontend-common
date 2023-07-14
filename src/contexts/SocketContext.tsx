import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { Socket } from 'socket.io-client'
import { SOCKET_EVENTS, SocketPayload } from 'common'
import { useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useState<SocketPayload.Notify[]>([])

  useEffect(() => {
    const onNotify = (payload: SocketPayload.Notify) =>
      setNotifications((N) => [...N, payload])
    const onRefresh = () => queryClient.invalidateQueries(['games'])

    socket.on(SOCKET_EVENTS.NOTIFY, onNotify)
    socket.on(SOCKET_EVENTS.REFRESH, onRefresh)

    return () => {
      socket.off(SOCKET_EVENTS.NOTIFY, onNotify)
      socket.off(SOCKET_EVENTS.REFRESH, onRefresh)
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
