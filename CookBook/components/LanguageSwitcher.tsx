import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useLanguage } from '@/hooks/useLanguage'
import { COLORS, LAYOUT } from '@/constants/Constants'

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage()

  return (
    <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
      <Text style={styles.text}>{currentLanguage === 'en' ? 'RU' : 'EN'}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    padding: 7,
    backgroundColor: COLORS.BUTTON_REGISTRATION,
    borderRadius: 8,
    paddingHorizontal: 30,
    alignItems: LAYOUT.ALIGN.CENTER,
  },
  text: {
    color: COLORS.WHITE,
  },
})
