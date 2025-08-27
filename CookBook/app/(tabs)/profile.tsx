import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ButtonQuit } from '@/components/ButtonQuit'
import { COLORS } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Profile() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading Profile...</Text>
      <ButtonQuit onPress={() => router.replace('/(auth)/register')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.GREY,
  },
})
