import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS, LAYOUT } from '@/constants/Constants'
import { ButtonQuitProps } from '@/types/types'
import { useTranslation } from 'react-i18next'

export const ButtonQuit = ({ onPress }: ButtonQuitProps) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{t('profile.logout')}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.RED,
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: LAYOUT.ALIGN.CENTER,
    justifyContent: LAYOUT.ALIGN.CENTER,
    paddingHorizontal: 20,
  },
})
