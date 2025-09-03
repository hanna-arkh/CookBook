import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useLanguage } from '@/hooks/useLanguage'
import { COLORS } from '@/constants/Constants'

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
    padding: 10,
    backgroundColor: COLORS.BUTTON_REGISTRATION,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  text: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
})
