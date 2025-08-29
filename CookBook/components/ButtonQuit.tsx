import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS, LAYOUT } from '@/constants/Constants'
import { ButtonQuitProps } from '@/types/types'

export const ButtonQuit = ({ onPress }: ButtonQuitProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>Quit</Text>
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
