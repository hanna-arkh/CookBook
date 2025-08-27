import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { InputEmail } from '@/components/InputEmail'
import { InputPassword } from '@/components/InputPassword'
import { ButtonLogin } from '@/components/ButtonLogin'
import { useAuthStore } from '@/store/store'
import { COLORS } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function LoginScreen() {
  const { signIn, isLoading, error, isLoggedIn } = useAuthStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isFormValid = !!email && !!password
  const { t } = useTranslation()

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('./(tabs)')
    }
  }, [isLoggedIn])

  const handleLogin = async () => {
    try {
      await signIn(email, password)
    } catch (err) {
      console.log('Login error:', err)
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
      {error && error !== 'user_not_found' && <Text style={{ color: 'red' }}>{error}</Text>}
      <ButtonLogin onPress={handleLogin} isLoading={isLoading} disabled={!isFormValid} />
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>{t('login.signUp')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  link: {
    marginTop: 20,
    color: COLORS.LINK_COLOR,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
