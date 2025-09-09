import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS, LAYOUT, ROUTES } from '@/constants/Constants'
import { useRouter } from 'expo-router'
import { AnimatedView } from '@/components/AnimatedView'
import { useAuthStore } from '@/store/store'

export default function Profile() {
  const { isLoggedIn } = useAuthStore()
  const email = useAuthStore(state => state.currentUser)
  const router = useRouter()
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(ROUTES.AUTH)
    }
  }, [isLoggedIn, router])

  return (
    <AnimatedView>
      <View style={styles.container}>
        <Text style={styles.loadingText}>Hello, {email}</Text>
      </View>
    </AnimatedView>
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
    color: COLORS.BLACK,
  },
})
