import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { ButtonRegisterProps } from '@/types/types'
import { COLORS, LAYOUT } from '@/constants/Constants'
export const ButtonLogin = ({ isLoading, disabled, onPress }: ButtonRegisterProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled || isLoading}>
      <Text>Login</Text>
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
