import * as SecureStore from 'expo-secure-store'

export const SecureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.error('SecureStorage setItem error:', error)
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (error) {
      console.error('SecureStorage getItem error:', error)
      return null
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key)
    } catch (error) {
      console.error('SecureStorage removeItem error:', error)
    }
  },
}
