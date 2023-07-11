import React from 'react'
import { SocketPayload } from 'common'
import { useSocket, useUIContext } from '../contexts'

interface NotificationProps extends SocketPayload.Notify {
  clear: () => void
}

const Notification = ({ clear, header, body, variant }: NotificationProps) => {
  const { Toast, Span, Div, Marked } = useUIContext()
  return (
    <Toast onClose={clear} bg={variant}>
      <Span>{header}</Span>
      <Div style={{ color: 'white' }}>
        <Marked>{body}</Marked>
      </Div>
    </Toast>
  )
}

const Notifications = () => {
  const { ToastContainer } = useUIContext()
  const { notifications, setNotifications } = useSocket()!
  const clearNotification = (uuid: string) =>
    setNotifications((N) => N.filter((n) => n.uuid !== uuid))

  return (
    <ToastContainer
      position='top-end'
      containerPosition='fixed'
      style={{ margin: '20px' }}
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.uuid}
          {...notification}
          clear={() => clearNotification(notification.uuid)}
        />
      ))}
    </ToastContainer>
  )
}

export default Notifications
