import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { InputEmail } from '@/components/InputEmail'
import { InputPassword } from '@/components/InputPassword'
import { ButtonRegister } from '@/components/ButtonRegister'
import { useAuthStore } from '@/store/store'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { COLORS, ROUTES, LAYOUT, FONT_STYLES } from '@/constants/Constants'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function TabOneScreen() {
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

  const handleRegister = () => {
    register(email, password)
  }

  const handleEmailChange = (text: string) => {
    setEmail(text)
    setIsEmailValid(emailRegex.test(text))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login.letsSignUp')}</Text>
      <InputEmail value={email} onChangeText={handleEmailChange} isValid={isEmailValid} />
      <InputPassword value={password} onChangeText={setPassword} />
      {error && <Text style={{ color: COLORS.RED }}>{error}</Text>}
      {isEmailValid || <Text style={{ color: COLORS.RED }}>{t('login.invalidEmail')}</Text>}
      <ButtonRegister onPress={handleRegister} isLoading={isLoading} disabled={!isFormValid} />
      <TouchableOpacity onPress={() => router.push(ROUTES.AUTH)}>
        <Text style={styles.link}>{t('login.loginButton')}</Text>
      </TouchableOpacity>
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
