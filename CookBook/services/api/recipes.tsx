export const fetchRecipes = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    const data = await response.json()
    return data.meals
  } catch (e) {
    console.error('Error', e)
    return []
  }
}
