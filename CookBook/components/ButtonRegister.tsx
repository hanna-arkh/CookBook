import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS, LAYOUT } from '@/constants/Constants'
import { ButtonRegisterProps } from '@/types/types'
import { useTranslation } from 'react-i18next'

export const ButtonRegister = ({ onPress, isLoading, disabled }: ButtonRegisterProps) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      <Text>{t('login.signUp')}</Text>
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
  disabledButton: {
    opacity: 0.5,
  },
})
