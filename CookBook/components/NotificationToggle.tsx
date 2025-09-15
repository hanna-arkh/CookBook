import React, { useState, useEffect } from 'react'
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import { useTranslation } from 'react-i18next'
import { COLORS, LAYOUT } from '@/constants/Constants'
interface NotificationToggleProps {
  onTokenChange?: (token: string) => void
}

export const NotificationToggle: React.FC<NotificationToggleProps> = ({ onTokenChange }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation()
  const handleRegistrationError = (errorMessage: string) => {
    Alert.alert('Ошибка', errorMessage)
    setLoading(false)
  }
  const checkPermissions = async () => {
    setLoading(true)
    try {
      if (!Device.isDevice) {
        handleRegistrationError('Уведомления работают только на реальных устройствах')

        return
      }
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      const granted = existingStatus === 'granted'
      setHasPermission(granted)
      setIsEnabled(granted)
      if (granted) {
        await getPushToken()
      }
    } catch (error) {
      handleRegistrationError(`Ошибка проверки разрешений: ${error}`)
    } finally {
      setLoading(false)
    }
  }
  const getPushToken = async () => {
    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId
      if (!projectId) {
        handleRegistrationError('Project ID not found')

        return
      }
      const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data
      if (onTokenChange) {
        onTokenChange(pushTokenString)
      }

      return pushTokenString
    } catch (e: unknown) {
      handleRegistrationError(`Ошибка получения токена: ${e}`)
    }
  }
  const requestPermissions = async () => {
    setLoading(true)
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      })
      const granted = status === 'granted'
      setHasPermission(granted)
      setIsEnabled(granted)
      if (granted) {
        const token = await getPushToken()
        Alert.alert(t('common.success'), t('settings.notificationsEnabled'))

        return token
      } else {
        Alert.alert(
          'Разрешение не получено',
          'Вы можете включить уведомления в настройках устройства',
          [
            { text: 'Отмена', style: 'cancel' },
            { text: 'Открыть настройки', onPress: openNotificationSettings },
          ]
        )
      }
    } catch (error) {
      handleRegistrationError(`Ошибка запроса разрешений: ${error}`)
    } finally {
      setLoading(false)
    }
  }
  const openNotificationSettings = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:')
      } else {
        await Linking.openSettings()
      }
    } catch {
      Alert.alert('Ошибка', 'Не удалось открыть настройки')
    }
  }
  const toggleNotifications = async () => {
    if (isEnabled) {
      await openNotificationSettings()
    } else {
      await requestPermissions()
    }
  }
  useEffect(() => {
    checkPermissions()
  }, [])
  if (loading) {
    return (
      <TouchableOpacity style={styles.button} disabled>
        <ActivityIndicator size="small" color={COLORS.BLUE} />
        <Text style={styles.text}>{t('settings.permissionCheck')}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={styles.button} onPress={toggleNotifications} activeOpacity={0.7}>
      <Text style={styles.text}>
        {isEnabled ? t('settings.notificationsEnabled') : t('settings.enableNotifications')}
      </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.BUTTON_REGISTRATION,
    alignItems: LAYOUT.ALIGN.CENTER,
  },
  text: {
    color: COLORS.WHITE,
  },
})
