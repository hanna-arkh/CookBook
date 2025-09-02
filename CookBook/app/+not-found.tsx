import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, LAYOUT, FONT_STYLES } from '@/constants/Constants'
import { Text, View } from 'react-native'
import { ALERTS } from '@/constants/Strings'
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: ALERTS.OOPS }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesnt exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: LAYOUT.ALIGN.CENTER,
    justifyContent: LAYOUT.ALIGN.CENTER,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: FONT_STYLES.WEIGHT.BOLD,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.LINK_COLOR,
  },
})
