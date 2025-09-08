import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AUTH } from '@/constants/Constants'
import { ALERTS } from '@/constants/Strings'
import * as SQLite from 'expo-sqlite'
import CryptoJS from 'crypto-js'
import Constants from 'expo-constants'
const SECRET_KEY = Constants.expoConfig?.extra?.SECRET_KEY
if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is missed!')
}
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
async function setupDatabase(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync('app-storage.db')
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS kv (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `)

  return db
}
const dbPromise = setupDatabase()
const Storage = {
  setItem: async (key: string, value: string): Promise<void> => {
    const encrypted = CryptoJS.AES.encrypt(value.toString(), SECRET_KEY).toString()
    const db = await dbPromise
    await db.runAsync('INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)', key, encrypted)
  },
  getItem: async (key: string): Promise<string | null> => {
    const db = await dbPromise
    const result = await db.getFirstAsync<{ value: string }>(
      'SELECT value FROM kv WHERE key = ?',
      key
    )
    if (!result?.value) return null
    try {
      const bytes = CryptoJS.AES.decrypt(result.value, SECRET_KEY)
      const decrypted = bytes.toString(CryptoJS.enc.Utf8)
      if (!decrypted) throw new Error('Невозможно расшифровать')

      return decrypted
    } catch {
      await Storage.removeItem(key)

      return null
    }
  },
  removeItem: async (key: string): Promise<void> => {
    const db = await dbPromise
    await db.runAsync('DELETE FROM kv WHERE key = ?', key)
  },
  clearAll: async (): Promise<void> => {
    const db = await dbPromise
    await db.runAsync('DELETE FROM kv')
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
      storage: createJSONStorage(() => Storage),
    }
  )
)
