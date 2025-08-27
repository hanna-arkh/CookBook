import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { ButtonRegisterProps } from '@/types/types'
import { useTranslation } from 'react-i18next'

export const ButtonLogin = ({ isLoading, disabled, onPress }: ButtonRegisterProps) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled || isLoading}>
      <Text>{t('login.loginButton')}</Text>
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
