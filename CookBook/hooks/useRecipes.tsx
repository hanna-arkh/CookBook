import { useQuery } from '@tanstack/react-query'
import { Recipe } from '@/types/types'

export const useRecipes = (): {
  data: Recipe[]
  isLoading: boolean
  error: Error | null
  isError: boolean
} => {
  const result = useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
      const data = await response.json()
      return data.meals || []
    },
  })

  return {
    data: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    isError: result.isError,
  }
}
