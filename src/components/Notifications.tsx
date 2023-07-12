import React from 'react'
import { SocketPayload } from 'common'
import { useSocket, useUIContext } from '../contexts'

interface NotificationProps extends SocketPayload.Notify {
  clear: () => void
}

const Notification = ({ clear, header, body, variant }: NotificationProps) => {
  const ui = useUIContext()
  return (
    <ui.Toast onClose={clear} bg={variant} style={{ padding: '10px' }}>
      <ui.Span style={{ color: 'white', fontSize: 'large' }}>{header}</ui.Span>
      <ui.Div style={{ color: 'white', margin: '10px 0 0' }}>
        <ui.Marked>{body}</ui.Marked>
      </ui.Div>
    </ui.Toast>
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
