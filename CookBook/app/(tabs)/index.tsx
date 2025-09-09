import React, { useState, useMemo } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import RecipesItem from '@/components/RecipesItem'
import { FlatList, RefreshControl } from 'react-native'
import { Recipe } from '@/types/recipes'
import { COLORS, FONT_STYLES, LAYOUT } from '@/constants/Constants'
import { useRecipes } from '@/hooks/useRecipes'
import { AnimatedView } from '@/components/AnimatedView'
import { useTranslation } from 'react-i18next'
import * as Sentry from '@sentry/react-native'

export default function ListOfRecipes() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: recipes = [], isLoading, error, refetch } = useRecipes()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { t } = useTranslation()
  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } catch (e) {
      Sentry.captureException(e)
      throw e
    } finally {
      setRefreshing(false)
    }
  }
  const filteredRecipes: Recipe[] = useMemo(() => {
    if (!searchQuery) {
      return recipes
    }
    const query = searchQuery.toLowerCase().trim()

    return recipes.filter((recipe: Recipe) => recipe.strMeal.toLowerCase().includes(query))
  }, [recipes, searchQuery])
  if (error) {
    return (
      <View>
        <Text>{t('login.errors.couldntUploadRecipes')}</Text>
      </View>
    )
  }
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>{t('common.loading')}</Text>
      </View>
    )
  }

  return (
    <AnimatedView>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('common.search')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.idMeal}
          renderItem={({ item }) => <RecipesItem item={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.GREY]}
              progressBackgroundColor={COLORS.BLACK}
            />
          }
        />
      </SafeAreaView>
    </AnimatedView>
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
