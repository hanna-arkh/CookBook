import React, { useEffect, useState, useMemo } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import RecipesItem from '@/components/RecipesItem'
import { FlatList } from 'react-native'
import { Recipe } from '@/types/types'
import { fetchRecipes } from '@/services/api/recipes'
import { COLORS } from '@/constants/Colors'

export default function ListOfRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRecipes = useMemo(() => {
    if (!searchQuery) {
      return recipes
    }
    return recipes.filter(recipe =>
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [recipes, searchQuery])
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetchRecipes()
        setRecipes(response)
      } catch (e) {
        console.error('Error', e)
      } finally {
        setLoading(false)
      }
    }
    getRecipes()
  }, [])
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
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
    fontWeight: 'bold',
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
    width: '80%',
  },
})
