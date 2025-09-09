import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ButtonQuit } from '@/components/ButtonQuit'
import { COLORS, LAYOUT, ROUTES } from '@/constants/Constants'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/store'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { AnimatedView } from '@/components/AnimatedView'

export default function SettingsScreen() {
  const { logout } = useAuthStore()
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.replace(ROUTES.AUTH)
  }

  return (
    <AnimatedView>
      <View style={styles.container}>
        <View style={styles.languageContainer}>
          <LanguageSwitcher />
        </View>
        <ButtonQuit onPress={handleLogout} />
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
  languageContainer: {
    position: LAYOUT.ALIGN.ABSOLUTE,
    top: 40,
    right: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.GREY,
  },
})
