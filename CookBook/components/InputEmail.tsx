import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { COLORS, LAYOUT, AUTH, UI_LABELS } from '@/constants/Constants'
import { PropsEmail } from '@/types/types'
export const InputEmail = ({ value, onChangeText }: PropsEmail) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={UI_LABELS.EMAIL}
        keyboardType={AUTH.EMAIL_KEYBOARD}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: LAYOUT.WIDTH.FULL,
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.INPUT_BG_COLOR,
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.BLACK,
    marginHorizontal: 20,
  },
})
