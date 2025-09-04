import React from 'react'
import { render } from '@testing-library/react-native'
import RecipesItem from '@/components/RecipesItem'
describe('RecipesItem', () => {
  const item = {
    idMeal: '123',
    strMeal: 'Pizza',
    strMealThumb: 'https://example.com/pizza.jpg',
  }
  test('renders image and text correctly', () => {
    const { getByText, getByTestId } = render(<RecipesItem item={item} />)
    expect(getByText('Pizza')).toBeTruthy()
    const image = getByTestId('recipe-image')
    expect(image.props.source.uri).toBe('https://example.com/pizza.jpg')
  })
})
