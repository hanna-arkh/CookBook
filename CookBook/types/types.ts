export type Recipe = {
  strMeal: string
  strMealThumb: string
  idMeal: string
}

export type PropsEmail = {
  value: string
  onChangeText: (text: string) => void
}

export type PropsPassword = {
  value: string
  onChangeText: (text: string) => void
}

export type ButtonRegisterProps = {
  onPress: () => void
  isLoading: boolean
  disabled: boolean
}

export type ButtonQuitProps = {
  onPress: () => void
}

export type UseRecipes = {
  data: Recipe[]
  isLoading: boolean
  error: Error | null
  isError: boolean
}
