import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist, createJSONStorage } from 'zustand/middleware'

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
              userToken: 'user-token',
              isLoggedIn: true,
              currentUser: email,
              error: null,
            })
          } else {
            set({ error: 'Invalid email or password', isLoggedIn: false })
          }
        } catch (err) {
          set({ error: 'Login failed', isLoggedIn: false })
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { users } = get()

          if (users.some(u => u.email === email)) {
            set({ error: 'User already exists', isLoggedIn: false })
            return
          }

          const newUser = { email, password }
          set({
            users: [...users, newUser],
            userToken: 'user-token',
            isLoggedIn: true,
            currentUser: email,
            error: null,
          })
        } catch (err) {
          set({ error: 'Registration failed', isLoggedIn: false })
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
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
