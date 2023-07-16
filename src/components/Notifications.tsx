import React from 'react'
import { SocketPayload } from 'common'
import { useSocket, useUIContext } from '../contexts'

interface NotificationProps extends SocketPayload.Notify {
  clear: () => void
}

const Notification = ({ clear, header, body, variant }: NotificationProps) => {
  const ui = useUIContext()
  return (
    <ui.Toast onClose={clear} bg={variant}>
      <ui.ToastHeader>{header}</ui.ToastHeader>
      <ui.Div style={{ color: 'white', margin: '10px 0 0', padding: '10px' }}>
        <ui.Marked>{body}</ui.Marked>
      </ui.Div>
    </ui.Toast>
  )
}

const Notifications = () => {
  const ui = useUIContext()
  const { notifications, setNotifications } = useSocket()!
  const clearNotification = (uuid: string) =>
    setNotifications((N) => N.filter((n) => n.uuid !== uuid))

  return (
    <ui.ToastContainer
      position='bottom-start'
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
    </ui.ToastContainer>
  )
}

export default Notifications
