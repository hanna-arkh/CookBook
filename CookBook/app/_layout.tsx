import React, { useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import '@/services/i18n'
import * as Sentry from '@sentry/react-native'
import '@/services/sentry'
import firebase from '@react-native-firebase/app'
import * as Notifications from 'expo-notifications'
const firebaseConfig = {
  apiKey: 'AIzaSyC4QWc4p3kAvswSCq4dW1gRtfgzWp_Kuto',
  projectId: 'cookbook-e0271',
  appId: '1:959183796747:android:aecd8348416fedcccfa50e',
  messagingSenderId: '959183796747',
  storageBucket: 'cookbook-e0271.firebasestorage.app',
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}
SplashScreen.preventAutoHideAsync()

export default Sentry.wrap(function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
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
})
function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  )
}
