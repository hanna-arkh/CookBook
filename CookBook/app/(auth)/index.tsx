import React from 'react'
import { useState, useEffect } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { InputEmail } from '@/components/InputEmail'
import { InputPassword } from '@/components/InputPassword'
import { ButtonLogin } from '@/components/ButtonLogin'
import { useAuthStore } from '@/store/store'
import { COLORS, ROUTES, LAYOUT, FONT_STYLES } from '@/constants/Constants'
import { useRouter } from 'expo-router'
import { ALERTS } from '@/constants/Strings'
import ButtonSwitchAuth from '@/components/ButtonSwitchAuth'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function LoginScreen() {
  const { signIn, isLoading, error, isLoggedIn } = useAuthStore()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const isFormValid = !!email && !!password
  const { t } = useTranslation()

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(ROUTES.TABS_DOT)
    }
  }, [isLoggedIn])

  const handleLogin = async () => {
    try {
      await signIn(email, password)
    } catch (err) {
      console.log(ALERTS.LOGIN_FAILED, err)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <LanguageSwitcher />
      </View>
      <Text style={styles.title}>{t('login.title')}</Text>
      <InputEmail value={email} onChangeText={setEmail} />
      <InputPassword value={password} onChangeText={setPassword} />
      {error && error !== ALERTS.USER_NOT_FOUND && (
        <Text style={{ color: COLORS.RED }}>{error}</Text>
      )}
      <ButtonLogin onPress={handleLogin} isLoading={isLoading} disabled={!isFormValid} />
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
  languageContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
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
