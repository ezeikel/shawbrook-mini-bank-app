import * as SecureStore from 'expo-secure-store';

export const SecureStorage = {
  setAuthToken: async (token: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync('auth_token', token);
    } catch (error) {
      console.error('Error storing auth token:', error);
    }
  },

  getAuthToken: async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync('auth_token');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  removeAuthToken: async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  },

  setUserPreference: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(`pref_${key}`, value);
    } catch (error) {
      console.error('Error storing user preference:', error);
    }
  },

  getUserPreference: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(`pref_${key}`);
    } catch (error) {
      console.error('Error getting user preference:', error);
      return null;
    }
  },
}; 