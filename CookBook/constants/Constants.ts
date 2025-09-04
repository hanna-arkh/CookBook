export const COLORS = {
  WHITE: 'white',
  BLACK: 'black',
  BLUE: 'blue',
  RED: 'red',
  GREY: 'grey',
  LIST_ITEM_BG: '#f9f9f9',
  LINK_COLOR: '#2e78b7',
  BUTTON_REGISTRATION: '#007AFF',
  INPUT_BG_COLOR: '#f0f0f0',
  INPUT_BORDER: '#ccc',
} as const

export const ROUTES = {
  TABS: '/(tabs)',
  AUTH: '/(auth)',
  LOGIN: '/login',
  REGISTER: '/register',
  MAIN_TAB_INDEX: 'index',
  PROFILE: 'profile',
  REGISTER_NAME: 'register',
  TABS_DOT: './(tabs)',
  TABS_MAIN: '(tabs)',
} as const

export const FONT_STYLES = {
  WEIGHT: {
    BOLD: 'bold',
  },
} as const

export const LAYOUT = {
  ALIGN: {
    CENTER: 'center',
    ABSOLUTE: 'absolute',
  },
  WIDTH: {
    FULL: '100%',
    EIGHTY_PERCENT: '80%',
  },
} as const

export const ICONS = {
  BOWL_FOOD: 'bowl-food',
  PROFILE: 'profile',
} as const

export const AUTH = {
  EMAIL_KEYBOARD: 'email-address',
  USER_TOKEN_KEY: 'user-token',
  STORAGE_KEY: 'auth-storage',
} as const

export const ASSETS = {
  FONTS: {
    SPACE_MONO: '../assets/fonts/SpaceMono-Regular.ttf',
  },
} as const
