import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { Recipe } from '@/types/recipes'
import { COLORS, LAYOUT } from '@/constants/Constants'

export default function RecipesItem({ item }: { item: Recipe }) {
  return (
    <TouchableOpacity style={recipeCardStyles.card}>
      <Image
        source={{ uri: item.strMealThumb }}
        style={recipeCardStyles.image}
        testID="recipe-image"
      />
      <Text style={recipeCardStyles.text}>{item.strMeal}</Text>
    </TouchableOpacity>
  )
}
const recipeCardStyles = StyleSheet.create({
  card: {
    flexDirection: LAYOUT.ALIGN.ROW,
    alignItems: LAYOUT.ALIGN.CENTER,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: COLORS.LIST_ITEM_BG,
    borderRadius: 10,
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
