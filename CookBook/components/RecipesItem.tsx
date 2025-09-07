import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Recipe } from '@/types/types'
import { COLORS, LAYOUT } from '@/constants/Constants'
import { LazyImage } from '@/components/LazyImage'

export default function RecipesItem({ item }: { item: Recipe }) {
  return (
    <TouchableOpacity style={recipeCardStyles.card}>
      <LazyImage uri={item.strMealThumb} />
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
  text: {
    fontSize: 16,
  },
})
