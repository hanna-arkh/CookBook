import React from 'react'
import { Text, Image, StyleSheet, View } from 'react-native'
import { Recipe } from '@/types/types'
import { COLORS } from '@/constants/Colors'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

const AnimatedView = Animated.createAnimatedComponent(View)

export default function DraggableItem({ item }: { item: Recipe }) {
  const offsetX = useSharedValue(0)
  const offsetY = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      offsetX.value = event.translationX
      offsetY.value = event.translationY
    })
    .onEnd(() => {
      offsetX.value = withSpring(0)
      offsetY.value = withSpring(0)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }))

  return (
    <GestureDetector gesture={panGesture}>
      <AnimatedView style={[recipeCardStyles.card, animatedStyle]}>
        <Image source={{ uri: item.strMealThumb }} style={recipeCardStyles.image} />
        <Text style={recipeCardStyles.text}>{item.strMeal}</Text>
      </AnimatedView>
    </GestureDetector>
  )
}

const recipeCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: COLORS.LIST_ITEM_BG,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
})
