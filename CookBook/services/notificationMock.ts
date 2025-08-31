import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

export const getMockPushToken = (): string => {
  return `ExponentPushToken[MockToken_${Math.random().toString(36).substr(2, 9)}]`
}

export const isEmulator = (): boolean => {
  return !Device.isDevice
}

export const registerForPushNotifications = async (): Promise<string | null> => {
  if (isEmulator()) {
    return getMockPushToken()
  }

  const { status } = await Notifications.getPermissionsAsync()
  if (status !== 'granted') {
    return null
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data
    return token
  } catch (error) {
    console.log('Error getting push token:', error)
    return null
  }
}

export const sendMockNotification = async (title: string, body: string, data?: any) => {
  if (isEmulator()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: ` ${title}`,
        body: body,
        data: data || {},
        sound: true,
      },
      trigger: {
        seconds: 1,
      } as any,
    })
    return true
  }

  return false
}
