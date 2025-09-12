import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { ROUTES, COLORS } from '@/constants/Constants'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function ButtonSwitchAuth() {
  const { t } = useTranslation()
  const router = useRouter()
  const { mode } = useLocalSearchParams<{ mode: 'register' | 'index ' }>()
  const isRegister = mode === 'register'
  const routeName = isRegister ? ROUTES.AUTH : ROUTES.REGISTER
  const linkText = isRegister ? t('login.loginButton') : t('login.signUp')

  return (
    <View>
      <TouchableOpacity onPress={() => router.navigate(routeName)}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  link: {
    marginTop: 20,
    color: COLORS.LINK_COLOR,
  },
})
