import React, { useState, useEffect } from 'react'
import { Text, View, Button, Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import '@/services/i18n'
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Внимание! Вы не предоставили разрешение на получение push-уведомлений.')

      return
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
    if (!projectId) {
      alert('Не найден Project ID в конфигурации приложения.')
    }
    try {
      const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data
      console.log('Push Token:', pushTokenString)

      return pushTokenString
    } catch (e: unknown) {
      alert(`Ошибка при получении push-токена: ${e}`)
    }
  } else {
    alert('Для получения push-уведомлений необходимо использовать физическое устройство.')
  }
}

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })
  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])
  useEffect(() => {
    if (error) throw error
  }, [error])
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])
  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}
function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="PushNotification" />
      </Stack>
    </QueryClientProvider>
  )
}
