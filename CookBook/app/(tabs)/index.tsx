import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import RecipesItem from '@/components/RecipesItem'
import { FlatList } from 'react-native'
import { Recipe } from '@/types/types'
import { fetchRecipes } from '@/services/api/recipes'

export default function ListOfRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

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
      <FlatList
        data={recipes}
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
