import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { ButtonQuit } from '@/components/ButtonQuit'
import i18n from '@/services/i18n'
describe('', () => {
  test('button renders with correct text', () => {
    const { getByText } = render(<ButtonQuit onPress={() => {}} />)
    const buttonText = getByText(i18n.t('profile.logout'))
    expect(buttonText).toBeTruthy()
  })
  test('', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(<ButtonQuit onPress={onPressMock} />)
    fireEvent.press(getByText(i18n.t('profile.logout')))
  })
})
