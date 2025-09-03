import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { InputEmail } from '@/components/InputEmail'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/services/i18n'
describe('InputEmail Component', () => {
  test('renders email input with placeholder in english', () => {
    i18n.changeLanguage('en')
    const { getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputEmail value="" onChangeText={() => {}} />
      </I18nextProvider>
    )
    expect(getByPlaceholderText('Email')).toBeTruthy()
  })
  test('renders email input with placeholder in russian', () => {
    i18n.changeLanguage('ru')
    const { getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputEmail value="" onChangeText={() => {}} />
      </I18nextProvider>
    )
    expect(getByPlaceholderText('Электронная почта')).toBeTruthy()
  })
  test('shows correct email value', () => {
    const email = 'user@test.com'
    const { getByDisplayValue } = render(<InputEmail value={email} onChangeText={() => {}} />)
    expect(getByDisplayValue(email)).toBeTruthy()
  })
  test('calls onChange when typing in enlish', () => {
    i18n.changeLanguage('en')
    const onChangeMock = jest.fn()
    const { getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputEmail value="" onChangeText={onChangeMock} />
      </I18nextProvider>
    )
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@mail.com')
    expect(onChangeMock).toHaveBeenCalledWith('test@mail.com')
  })
  test('calls onChange when typing in russian', () => {
    i18n.changeLanguage('ru')
    const onChangeMock = jest.fn()
    const { getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <InputEmail value="" onChangeText={onChangeMock} />
      </I18nextProvider>
    )
    fireEvent.changeText(getByPlaceholderText('Электронная почта'), 'test@mail.com')
    expect(onChangeMock).toHaveBeenCalledWith('test@mail.com')
  })
  test('looks correct (snapshot)', () => {
    const { toJSON } = render(<InputEmail value="test@example.com" onChangeText={() => {}} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
