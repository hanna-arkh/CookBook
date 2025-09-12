import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { InputPassword } from '@/components/InputPassword'
import i18n from '@/localization/i18n'
describe('InputPassword component', () => {
  test('renders input password with placeholder in english', () => {
    const { getByPlaceholderText } = render(<InputPassword value="" onChangeText={() => {}} />)
    expect(getByPlaceholderText(i18n.t('login.password'))).toBeTruthy()
  })
  test('display valid value', () => {
    const password = '12345'
    const { getByDisplayValue } = render(<InputPassword value={password} onChangeText={() => {}} />)
    expect(getByDisplayValue(password)).toBeTruthy()
  })
  test('onChange works', () => {
    const onChangeMock = jest.fn()
    const { getByPlaceholderText } = render(<InputPassword value="" onChangeText={onChangeMock} />)
    fireEvent.changeText(getByPlaceholderText(i18n.t('login.password')), '12345')
    expect(onChangeMock).toHaveBeenCalledWith('12345')
  })
  test('secureTextEntry enabled', async () => {
    const { findByPlaceholderText } = render(<InputPassword value="" onChangeText={() => {}} />)
    const input = await findByPlaceholderText(i18n.t('login.password'))
    expect(input.props.secureTextEntry).toBe(true)
  })
})
