import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { COLORS, LAYOUT, AUTH } from '@/constants/Constants'
import { PropsPassword } from '@/types/types'
import { useTranslation } from 'react-i18next'

export const InputPassword = ({ value, onChangeText }: PropsPassword) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t('login.password')}
        placeholderTextColor={COLORS.GREY}
        keyboardType={AUTH.EMAIL_KEYBOARD}
        autoCorrect={false}
        secureTextEntry
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
