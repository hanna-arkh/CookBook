import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS } from '@/constants/Colors'
export const ButtonQuit = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>Quit</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.RED,
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
})
