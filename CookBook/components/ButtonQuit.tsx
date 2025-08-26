import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export const ButtonQuit = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>Quit</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
})
