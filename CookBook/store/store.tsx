import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AUTH, ALERTS } from '@/constants/Constants'

type User = {
  email: string
  password: string
}

type AuthState = {
  isLoggedIn: boolean
  userToken: string | null
  isLoading: boolean
  error: string | null
  users: User[]
  currentUser: string | null
  signIn: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userToken: null,
      isLoading: false,
      error: null,
      users: [],
      currentUser: null,

      signIn: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { users } = get()
          const user = users.find(u => u.email === email && u.password === password)

          if (user) {
            set({
              userToken: AUTH.STORAGE_KEY,
              isLoggedIn: true,
              currentUser: email,
              error: null,
            })
          } else {
            set({ error: ALERTS.INVALID_CREDENTIALS, isLoggedIn: false })
          }
        } catch {
          set({ error: ALERTS.LOGIN_FAILED, isLoggedIn: false })
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { users } = get()

          if (users.some(u => u.email === email)) {
            set({ error: ALERTS.USER_EXISTS, isLoggedIn: false })
            return
          }

          const newUser = { email, password }
          set({
            users: [...users, newUser],
            userToken: AUTH.STORAGE_KEY,
            isLoggedIn: true,
            currentUser: email,
            error: null,
          })
        } catch {
          set({ error: ALERTS.REGISTRATION_FAILED, isLoggedIn: false })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({
          isLoggedIn: false,
          userToken: null,
          currentUser: null,
          error: null,
        })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: AUTH.STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
