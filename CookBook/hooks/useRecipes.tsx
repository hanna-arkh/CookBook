import { useQuery } from '@tanstack/react-query'
import { Recipe } from '@/types/types'
import { UseRecipes } from '@/types/types'

export const useRecipes = (): UseRecipes => {
  const result = useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }
      const data = await response.json()
      if (!data.meals) {
        throw new Error('No meals found in response')
      }

      return data.meals
    },
  })

  return {
    data: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    isError: result.isError,
  }
}
