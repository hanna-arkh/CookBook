import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ButtonQuit } from '@/components/ButtonQuit'
import { COLORS, LAYOUT, ROUTES } from '@/constants/Constants'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/store'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { AnimatedView } from '@/components/AnimatedView'

export default function Profile() {
  const { isLoggedIn, logout } = useAuthStore()
  const router = useRouter()
  const { t } = useTranslation()
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(ROUTES.AUTH)
    }
  }, [isLoggedIn, router])
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
        <Text style={styles.loadingText}>{t('profile.loading')}</Text>
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
