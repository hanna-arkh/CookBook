import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { InputPassword } from '@/components/InputPassword'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/services/i18n'
describe('InputPassword component', () => {
  test('renders input password with placeholder in english', () => {
    i18n.changeLanguage('en')
    const { getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputPassword value="" onChangeText={() => {}} />
      </I18nextProvider>
    )
    expect(getByPlaceholderText('Password')).toBeTruthy()
  })
  test('renders input password with placeholder in russian', () => {
    i18n.changeLanguage('ru')
    const { getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputPassword value="" onChangeText={() => {}} />
      </I18nextProvider>
    )
    expect(getByPlaceholderText('Пароль')).toBeTruthy()
  })
  test('display valid value', () => {
    const password = '12345'
    const { getByDisplayValue } = render(<InputPassword value={password} onChangeText={() => {}} />)
    expect(getByDisplayValue(password)).toBeTruthy()
  })
  test('onChange works', () => {
    const onChangeMock = jest.fn()
    i18n.changeLanguage('ru')
    const { getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputPassword value="" onChangeText={onChangeMock} />
      </I18nextProvider>
    )
    fireEvent.changeText(getByPlaceholderText('Пароль'), '12345')
    expect(onChangeMock).toHaveBeenCalledWith('12345')
  })
  test('onChange works', () => {
    const onChangeMock = jest.fn()
    i18n.changeLanguage('en')
    const { getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputPassword value="" onChangeText={onChangeMock} />
      </I18nextProvider>
    )
    fireEvent.changeText(getByPlaceholderText('Password'), '12345')
    expect(onChangeMock).toHaveBeenCalledWith('12345')
  })
  test('secureTextEntry enabled', async () => {
    i18n.changeLanguage('en')
    const { findByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputPassword value="" onChangeText={() => {}} />
      </I18nextProvider>
    )
    const input = await findByPlaceholderText('Password')
    expect(input.props.secureTextEntry).toBe(true)
  })
  test('secureTextEntry enabled', async () => {
    i18n.changeLanguage('ru')
    const { findByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputPassword value="" onChangeText={() => {}} />
      </I18nextProvider>
    )
    const input = await findByPlaceholderText('Пароль')
    expect(input.props.secureTextEntry).toBe(true)
  })
})
