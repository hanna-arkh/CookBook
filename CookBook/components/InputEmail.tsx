import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { COLORS } from '@/constants/Colors'
import { PropsEmail } from '@/types/types'
import { useTranslation } from 'react-i18next'

export const InputEmail = ({ value, onChangeText }: PropsEmail) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t('login.email')}
        keyboardType="email-address"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
