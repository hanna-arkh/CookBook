import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { InputEmail } from '@/components/InputEmail'
import { InputPassword } from '@/components/InputPassword'
import { ButtonRegister } from '@/components/ButtonRegister'
import { useAuthStore } from '@/store/store'
import { useRouter } from 'expo-router'
import { COLORS, ROUTES, LAYOUT, FONT_STYLES } from '@/constants/Constants'
import ButtonSwitchAuth from '@/components/ButtonSwitchAuth'
import { useTranslation } from 'react-i18next'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RegistrationScreen() {
  const { register, isLoading, error, isLoggedIn } = useAuthStore()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const isFormValid = isEmailValid && email && password
  const { t } = useTranslation()
  useEffect(() => {
    if (isLoggedIn) {
      router.replace(ROUTES.TABS)
    }
  }, [isLoggedIn])
  const handleRegister = useCallback(() => {
    register(email, password)
  }, [register, email, password])
  const handleEmailChange = useCallback((text: string) => {
    setEmail(text)
    setIsEmailValid(emailRegex.test(text))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login.letsSignUp')}</Text>
      <InputEmail value={email} onChangeText={handleEmailChange} isValid={isEmailValid} />
      <InputPassword value={password} onChangeText={setPassword} />
      {error && <Text style={{ color: COLORS.RED }}>{error}</Text>}
      {isEmailValid || <Text style={{ color: COLORS.RED }}>{t('login.errors.invalidEmail')}</Text>}
      <ButtonRegister onPress={handleRegister} isLoading={isLoading} disabled={!isFormValid} />
      <ButtonSwitchAuth />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: LAYOUT.ALIGN.CENTER,
    justifyContent: LAYOUT.ALIGN.CENTER,
  },
  title: {
    fontSize: 20,
    fontWeight: FONT_STYLES.WEIGHT.BOLD,
    marginVertical: 30,
  },
  link: {
    marginTop: 20,
    color: COLORS.LINK_COLOR,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: LAYOUT.WIDTH.EIGHTY_PERCENT,
  },
})
