import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { ButtonQuit } from '@/components/ButtonQuit'
import { COLORS, LAYOUT, ROUTES } from '@/constants/Constants'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/store'
import { sendMockNotification } from '@/services/notificationMock'

export default function Profile() {
  const { isLoggedIn, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(ROUTES.AUTH)
    }
  }, [isLoggedIn, router])

  const handleLogout = () => {
    logout()
    router.replace(ROUTES.AUTH)
  }

  const handleReceivingNotification = async () => {
    await sendMockNotification('New message', 'Its a test message', { type: 'message', id: '425' })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading Profile...</Text>
      <ButtonQuit onPress={handleLogout} />
      <Button title="Receive a message" onPress={handleReceivingNotification} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: LAYOUT.ALIGN.CENTER,
    alignItems: LAYOUT.ALIGN.CENTER,
    backgroundColor: COLORS.WHITE,
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.GREY,
  },
})
