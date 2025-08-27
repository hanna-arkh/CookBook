import { create } from 'zustand'

type AuthState = {
  isLoggedIn: boolean
  userToken: string | null
  isLoading: boolean
  error: string | null
  signIn: (username: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  userToken: null,
  isLoading: false,
  error: null,

  signIn: async (username, password) => {
    set({ isLoading: true, error: null })
    try {
      if (username === 'test@example.com' && password === 'password') {
        set({ userToken: 'fake-token', isLoggedIn: true })
      } else {
        set({ error: 'user_not_found', isLoggedIn: false })
      }
    } finally {
      set({ isLoading: false })
    }
  },

  register: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      if (email && password) {
        set({ userToken: 'fake-token', isLoggedIn: true })
      } else {
        set({ error: 'Fill all inputs', isLoggedIn: false })
      }
    } finally {
      set({ isLoading: false })
    }
  },
}))
