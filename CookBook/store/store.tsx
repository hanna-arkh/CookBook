import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { SecureStorage } from '@/services/secureStorage'

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
  logout: () => Promise<void>
  clearError: () => void
  initializeAuth: () => Promise<void>
  generateSecureToken: () => string
}

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return SecureStorage.getItem(name)
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStorage.setItem(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStorage.removeItem(name)
  },
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

      initializeAuth: async () => {
        try {
          const token = await SecureStorage.getItem('userToken')
          if (token) {
            set({ isLoggedIn: true, userToken: token })
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
        }
      },

      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const { users } = get()
          const user = users.find(u => u.email === email && u.password === password)

          if (user) {
            const token = get().generateSecureToken()

            await SecureStorage.setItem('userToken', token)
            await SecureStorage.setItem('userEmail', email)
            set({
              userToken: token,
              isLoggedIn: true,
              currentUser: email,
              error: null,
            })
          } else {
            set({ error: 'Invalid email or password', isLoggedIn: false })
          }
        } catch {
          set({ error: 'Login failed', isLoggedIn: false })
        } finally {
          set({ isLoading: false })
        }
      },
      register: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const { users } = get()

          if (users.some(u => u.email === email)) {
            set({ error: 'User already exists', isLoggedIn: false })
            return
          }

          const newUser = { email, password }
          const token = get().generateSecureToken()

          await SecureStorage.setItem('userToken', token)
          await SecureStorage.setItem('userEmail', email)

          set({
            users: [...users, newUser],
            userToken: token,
            isLoggedIn: true,
            currentUser: email,
            error: null,
          })
        } catch {
          set({ error: 'Registration failed', isLoggedIn: false })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        try {
          await SecureStorage.removeItem('userToken')
          await SecureStorage.removeItem('userEmail')

          set({
            isLoggedIn: false,
            userToken: null,
            currentUser: null,
            error: null,
          })
        } catch (error) {
          console.error('Logout error:', error)
        }
      },

      clearError: () => set({ error: null }),

      generateSecureToken: (): string => {
        return 'eyJ' + Math.random().toString(36).substring(2) + Date.now().toString(36)
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),

      partialize: state => ({
        users: state.users,
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
)
