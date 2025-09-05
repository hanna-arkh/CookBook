import React, { useEffect, useMemo } from 'react'
import { Dimensions, View, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import tinycolor from 'tinycolor2'
const { width } = Dimensions.get('screen')
const HEIGHT = 5
const DURATION = 1200
const PROGRESS_WIDTH = width / 2
type ProgressBarProps = {
  color: string
  style: StyleProp<ViewStyle>
}

export const ProgressBar = ({ color, style }: ProgressBarProps) => {
  const translateX = useSharedValue(-PROGRESS_WIDTH)
  const { backgroundColor, foregroundColor } = useMemo(() => {
    return {
      backgroundColor: tinycolor(color).lighten(30).toHexString(),
      foregroundColor: color,
    }
  }, [color])
  useEffect(() => {
    translateX.value = withRepeat(
      withDelay(
        DURATION / 2,
        withTiming(width, {
          duration: DURATION,
        })
      ),
      -1
    )
  }, [translateX])
  const progress = useAnimatedStyle(() => {
    return {
      width: PROGRESS_WIDTH,
      height: HEIGHT,
      transform: [{ translateX: translateX.value }],
    }
  })

  return (
    <View style={[style, styles.container, { backgroundColor }]}>
      <Animated.View style={[progress, { backgroundColor: foregroundColor }]} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width,
    height: HEIGHT,
  },
})
