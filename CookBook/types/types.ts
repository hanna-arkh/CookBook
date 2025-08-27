export type Recipe = {
  strMeal: string
  strMealThumb: string
  idMeal: string
}
export type PropsEmail = {
  value: string
  onChangeText: (text: string) => void
  isValid: boolean
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
