import { useQuery } from '@tanstack/react-query'
import { Recipe, UseRecipes } from '@/types/types'
import * as Sentry from '@sentry/react-native'

export const useRecipes = (): UseRecipes => {
  const result = useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: async (): Promise<Recipe[]> => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`)
        }
        const data = await response.json()
        if (!data.meals) {
          throw new Error('No meals found in response')
        }

        return data.meals
      } catch (err) {
        Sentry.captureException(err)
        throw err
      }
    },
  })

  return {
    data: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    isError: result.isError,
  }
}
