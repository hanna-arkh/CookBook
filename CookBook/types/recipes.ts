export type Recipe = {
  strMeal: string
  strMealThumb: string
  idMeal: string
}

export type UseRecipes = {
  data: Recipe[]
  isLoading: boolean
  error: Error | null
  isError: boolean
}
