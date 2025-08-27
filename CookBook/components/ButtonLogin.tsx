import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { ButtonRegisterProps } from '@/types/types'

export const ButtonLogin = ({ isLoading, disabled }: ButtonRegisterProps) => {
  const useAuth = () => {
    return { isAuthenticated: true }
  }
  return (
    <TouchableOpacity style={styles.button} onPress={useAuth} disabled={disabled || isLoading}>
      <Text>Login</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
})
