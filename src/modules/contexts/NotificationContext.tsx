import Notification, { NotificationContainer } from 'components/Notification'
import { createContext, useState } from 'react'

export enum NotificationType {
  Error = 'error',
  Success = 'success'
}

const NotificationContext = createContext<{
  triggerNotification: (
    title: string,
    description: string,
    type: NotificationType,
    dismissAfter: number,
    onDismiss?: () => void
  ) => void
}>({
  triggerNotification: () => {}
})

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [NotificationProps, setNotificationProps] = useState({
    title: '',
    description: '',
    type: NotificationType.Success,
    dismissAfter: 0,
    onDismiss: () => {}
  })

  const triggerNotification = (
    title: string,
    description: string,
    type: NotificationType,
    dismissAfter: number,
    onDismiss?: () => void
  ) => {
    setNotificationProps({
      title,
      description,
      type,
      dismissAfter,
      onDismiss
    })
  }
  return (
    <NotificationContext.Provider value={{ triggerNotification }}>
      {children}
      <NotificationContainer>
        <Notification
          visible={!!NotificationProps.description || !!NotificationProps.title}
          title={NotificationProps.title}
          description={NotificationProps.description}
          error={NotificationProps.type === NotificationType.Error}
          success={NotificationProps.type === NotificationType.Success}
          onDismiss={() => {
            NotificationProps.onDismiss && NotificationProps.onDismiss()
            setNotificationProps((prevState) => ({ ...prevState, description: '', title: '' }))
          }}
          dismissAfter={NotificationProps.dismissAfter}
        />
      </NotificationContainer>
    </NotificationContext.Provider>
  )
}

export { NotificationContext, NotificationProvider }
