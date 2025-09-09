import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { ButtonRegisterProps } from '@/types/button'
import { useTranslation } from 'react-i18next'
import { COLORS, LAYOUT } from '@/constants/Constants'

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
    backgroundColor: COLORS.BUTTON_REGISTRATION,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: LAYOUT.ALIGN.CENTER,
    justifyContent: LAYOUT.ALIGN.CENTER,
    paddingHorizontal: 40,
  },
})
