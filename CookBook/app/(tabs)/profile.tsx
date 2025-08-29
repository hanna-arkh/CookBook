import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ButtonQuit } from '@/components/ButtonQuit'
import { COLORS } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/store'
export default function Profile() {
  const { isLoggedIn, logout } = useAuthStore()

  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/(auth)')
    }
  }, [isLoggedIn, router])

  const handleLogout = () => {
    logout()
    router.replace('/(auth)')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading Profile...</Text>
      <ButtonQuit onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.GREY,
  },
})
