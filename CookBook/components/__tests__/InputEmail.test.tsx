import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { InputEmail } from '@/components/InputEmail'

describe('InputEmail Component', () => {
  test('renders email input with placeholder', () => {
    const { getByPlaceholderText } = render(<InputEmail value="" onChangeText={() => {}} />)
    expect(getByPlaceholderText('Email')).toBeTruthy()
  })

  test('shows correct email value', () => {
    const email = 'user@test.com'
    const { getByDisplayValue } = render(<InputEmail value={email} onChangeText={() => {}} />)
    expect(getByDisplayValue(email)).toBeTruthy()
  })

  test('calls onChange when typing', () => {
    const onChangeMock = jest.fn()
    const { getByPlaceholderText } = render(<InputEmail value="" onChangeText={onChangeMock} />)

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@mail.com')
    expect(onChangeMock).toHaveBeenCalledWith('test@mail.com')
  })

  test('looks correct (snapshot)', () => {
    const { toJSON } = render(<InputEmail value="test@example.com" onChangeText={() => {}} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
