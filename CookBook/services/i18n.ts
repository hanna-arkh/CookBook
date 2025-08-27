import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const en = {
  login: {
    title: 'Welcome!',
    email: 'Email',
    password: 'Password',
    loginButton: 'Login',
    signUp: 'Sign Up',
    noAccount: "Don't have an account?",
    errors: {
      invalidCredentials: 'Invalid email or password',
      loginFailed: 'Login failed',
    },
  },
  profile: {
    title: 'Profile',
    loading: 'Loading Profile...',
    logout: 'Logout',
  },
}

const ru = {
  login: {
    title: 'Добро пожаловать!',
    email: 'Электронная почта',
    password: 'Пароль',
    loginButton: 'Войти',
    signUp: 'Зарегистрироваться',
    noAccount: 'Нет аккаунта?',
    errors: {
      invalidCredentials: 'Неверный email или пароль',
      loginFailed: 'Ошибка входа',
    },
  },
  profile: {
    title: 'Профиль',
    loading: 'Загрузка профиля...',
    logout: 'Выйти',
  },
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
