import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ButtonQuit } from '@/components/ButtonQuit'
import { COLORS } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/store'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function Profile() {
  const { isLoggedIn, logout } = useAuthStore()
  const { t } = useTranslation()

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
      <View style={styles.languageContainer}>
        <LanguageSwitcher />
      </View>
      <Text style={styles.loadingText}>{t('profile.loading')}</Text>
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
  languageContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.GREY,
  },
})
