import React, { useState, useMemo } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import RecipesItem from '@/components/RecipesItem'
import { FlatList } from 'react-native'
import { Recipe } from '@/types/types'

import { COLORS, FONT_STYLES, LAYOUT } from '@/constants/Constants'
import { useRecipes } from '@/hooks/useRecipes'
import { UI_LABELS } from '@/constants/Strings'

export default function ListOfRecipes() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: recipes = [], isLoading, error } = useRecipes()


  const filteredRecipes: Recipe[] = useMemo(() => {
    if (!searchQuery) {
      return recipes
    }
    const query = searchQuery.toLowerCase().trim()
    return recipes.filter((recipe: Recipe) => recipe.strMeal.toLowerCase().includes(query))
  }, [recipes, searchQuery])

  if (isLoading) {

    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View>
        <Text>Error loading recipes</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={UI_LABELS.SEARCH}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => <RecipesItem item={item} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: FONT_STYLES.WEIGHT.BOLD,
    marginVertical: 30,
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.GREY,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: LAYOUT.WIDTH.EIGHTY_PERCENT,
  },
})
