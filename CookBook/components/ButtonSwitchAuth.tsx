import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { ROUTES, COLORS } from '@/constants/Constants'
import { useRouter, usePathname } from 'expo-router'
import { useNavigation } from 'expo-router'

export default function ButtonSwitchAuth() {
  const { t } = useTranslation()
  const router = useRouter()
  const navigator = useNavigation()
  console.log('navigator', navigator.getState())
  const pathname = usePathname()
  const isRegisterScreen = pathname.startsWith(ROUTES.REGISTER)
  const buttonText = isRegisterScreen ? t('login.loginButton') : t('login.signUp')
  const handlePress = () => {
    if (isRegisterScreen) {
      router.back()
    } else {
      router.push(ROUTES.REGISTER)
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>{buttonText}</Text>
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
