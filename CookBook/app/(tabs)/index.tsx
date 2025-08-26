import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
//create input components and button
import { useEffect, useState } from 'react'
import RecipesItem from '@/components/RecipesItem'
import { FlatList } from 'react-native'
import { Recipe } from '@/types/types'
export default function ListOfRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        const data = await response.json()
        if (data.meals) {
          setRecipes(data.meals)
        }
      } catch (e) {
        console.error('Error', e)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => <RecipesItem item={item} />}
      />
    </View>
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
