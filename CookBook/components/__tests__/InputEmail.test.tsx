import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { InputEmail } from '@/components/InputEmail'
import i18n from '@/services/i18n'
describe('InputEmail Component', () => {
  test('renders email input with placeholder in english', () => {
    const { getByPlaceholderText } = render(<InputEmail value="" onChangeText={() => {}} />)
    expect(getByPlaceholderText(i18n.t('login.email'))).toBeTruthy()
  })

  test('shows correct email value', () => {
    const email = 'user@test.com'
    const { getByDisplayValue } = render(<InputEmail value={email} onChangeText={() => {}} />)
    expect(getByDisplayValue(email)).toBeTruthy()
  })
  test('calls onChange when typing in enlish', () => {
    const onChangeMock = jest.fn()
    const { getByPlaceholderText } = render(<InputEmail value="" onChangeText={onChangeMock} />)
    fireEvent.changeText(getByPlaceholderText(i18n.t('login.email')), 'test@mail.com')
    expect(onChangeMock).toHaveBeenCalledWith('test@mail.com')
  })

  test('looks correct (snapshot)', () => {
    const { toJSON } = render(<InputEmail value="test@example.com" onChangeText={() => {}} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
