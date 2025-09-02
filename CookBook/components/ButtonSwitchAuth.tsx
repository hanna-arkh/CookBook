import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { ROUTES, COLORS } from '@/constants/Constants'
import { UI_LABELS } from '@/constants/Strings'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function ButtonSwitchAuth() {
  const router = useRouter()
  const { mode } = useLocalSearchParams<{ mode: 'register' | 'index ' }>()
  const isRegister = mode === 'register'
  const routeName = isRegister ? ROUTES.AUTH : ROUTES.REGISTER
  const linkText = isRegister ? UI_LABELS.LOG_IN : UI_LABELS.SIGN_UP
  return (
    <View>
      <TouchableOpacity onPress={() => router.push(routeName)}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  link: {
    marginTop: 20,
    color: COLORS.LINK_COLOR,
  },
})
