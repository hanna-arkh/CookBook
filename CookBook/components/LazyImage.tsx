import React, { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { LAYOUT, COLORS } from '@/constants/Constants'
type LazyImageProps = {
  uri: string
  style?: object
}

export const LazyImage = ({ uri, style }: LazyImageProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <View style={styles.container}>
      {loading && !error && (
        <View style={styles.loader}>
          <ActivityIndicator size={LAYOUT.SIZE.SMALL} color={COLORS.BLACK} />
        </View>
      )}
      {!error && (
        <Image
          source={{ uri }}
          style={[styles.image, style]}
          resizeMode={LAYOUT.SIZE.COVER}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false)
            setError(true)
          }}
        />
      )}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorIcon}>⚠️</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GREY,
    overflow: LAYOUT.ALIGN.HIDDEN,
    position: LAYOUT.ALIGN.RELATIVE,
    borderRadius: 30,
    marginRight: 10,
    width: 60,
    height: 60,
  },
  loader: {
    position: LAYOUT.ALIGN.ABSOLUTE,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: LAYOUT.ALIGN.CENTER,
    justifyContent: LAYOUT.ALIGN.CENTER,
  },
  image: {
    position: LAYOUT.ALIGN.ABSOLUTE,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  errorBox: {
    flex: 1,
    alignItems: LAYOUT.ALIGN.CENTER,
    justifyContent: LAYOUT.ALIGN.CENTER,
    backgroundColor: COLORS.GREY,
  },
  errorIcon: {
    fontSize: 32,
  },
})
