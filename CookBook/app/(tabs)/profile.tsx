import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { ButtonQuit } from '@/components/ButtonQuit'

export default function Profile() {
  // For now, this component just shows a loading state.
  // Later, you'll add logic to show this view only when isLoading is true.

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading Profile...</Text>
      <ButtonQuit />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // These two lines center the content vertically and horizontally
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
})
