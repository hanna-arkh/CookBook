import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { InputEmail } from '@/components/InputEmail'
import { InputPassword } from '@/components/InputPassword'
import { ButtonRegister } from '@/components/ButtonRegister'
import { useAuthStore } from '@/store/store'
import { useRouter } from 'expo-router'
import { COLORS } from '@/constants/Colors'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function TabOneScreen() {
  const { register, isLoading, error, isLoggedIn } = useAuthStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const isFormValid = isEmailValid && email && password

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/(tabs)')
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
      <Text style={styles.title}>Lets sign up!</Text>
      <InputEmail value={email} onChangeText={handleEmailChange} isValid={isEmailValid} />
      <InputPassword value={password} onChangeText={setPassword} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {isEmailValid || <Text style={{ color: 'red' }}>Please write a valid email address.</Text>}
      <ButtonRegister onPress={handleRegister} isLoading={isLoading} disabled={!isFormValid} />
      <TouchableOpacity onPress={() => router.push('/(auth)')}>
        <Text style={styles.link}>Sign In</Text>
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
