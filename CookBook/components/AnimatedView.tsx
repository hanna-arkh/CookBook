import React, { useCallback } from 'react'
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'
type AnimatedProps = {
  children: React.ReactNode
}

export const AnimatedView = ({ children }: AnimatedProps) => {
  const opacity = useSharedValue(0)
  useFocusEffect(
    useCallback(() => {
      opacity.value = withTiming(1, { duration: 400 })

      return () => {
        opacity.value = withTiming(0, { duration: 300 })
      }
    }, [])
  )
  const styles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return <Animated.View style={[{ flex: 1 }, styles]}>{children}</Animated.View>
}
