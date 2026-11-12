import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  THEME_MODE: '@theme_mode',
  CURRENCY: '@currency',
  NOTIFICATIONS: '@notifications',
  LAST_SYNC: '@last_sync',
  CACHED_TRANSACTIONS: '@cached_transactions',
  CACHED_BUDGETS: '@cached_budgets',
};

// Generic storage helpers
export const storage = {
  // Save data
  async save(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return { success: true };
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      return { success: false, error };
    }
  },

  // Get data
  async get(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  // Remove data
  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      return { success: false, error };
    }
  },

  // Clear all data
  async clear() {
    try {
      await AsyncStorage.clear();
      return { success: true };
    } catch (error) {
      console.error('Error clearing storage:', error);
      return { success: false, error };
    }
  },

  // Get multiple items
  async getMultiple(keys) {
    try {
      const values = await AsyncStorage.multiGet(keys);
      const result = {};
      values.forEach(([key, value]) => {
        result[key] = value != null ? JSON.parse(value) : null;
      });
      return result;
    } catch (error) {
      console.error('Error getting multiple items:', error);
      return {};
    }
  },
};

// Auth-specific helpers
export const authStorage = {
  async saveAuth(token, user) {
    await storage.save(STORAGE_KEYS.AUTH_TOKEN, token);
    await storage.save(STORAGE_KEYS.USER_DATA, user);
  },

  async getAuth() {
    const token = await storage.get(STORAGE_KEYS.AUTH_TOKEN);
    const user = await storage.get(STORAGE_KEYS.USER_DATA);
    return { token, user };
  },

  async clearAuth() {
    await storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    await storage.remove(STORAGE_KEYS.USER_DATA);
  },
};

// Settings helpers
export const settingsStorage = {
  async saveTheme(theme) {
    return await storage.save(STORAGE_KEYS.THEME_MODE, theme);
  },

  async getTheme() {
    return await storage.get(STORAGE_KEYS.THEME_MODE);
  },

  async saveCurrency(currency) {
    return await storage.save(STORAGE_KEYS.CURRENCY, currency);
  },

  async getCurrency() {
    return await storage.get(STORAGE_KEYS.CURRENCY);
  },

  async saveNotificationPrefs(prefs) {
    return await storage.save(STORAGE_KEYS.NOTIFICATIONS, prefs);
  },

  async getNotificationPrefs() {
    return await storage.get(STORAGE_KEYS.NOTIFICATIONS);
  },
};

// Cache helpers for data
export const cacheStorage = {
  async cacheTransactions(transactions) {
    await storage.save(STORAGE_KEYS.CACHED_TRANSACTIONS, {
      data: transactions,
      timestamp: Date.now(),
    });
  },

  async getCachedTransactions(maxAge = 5 * 60 * 1000) { // 5 minutes default
    const cached = await storage.get(STORAGE_KEYS.CACHED_TRANSACTIONS);
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > maxAge) {
      // Cache expired
      await storage.remove(STORAGE_KEYS.CACHED_TRANSACTIONS);
      return null;
    }

    return cached.data;
  },

  async cacheBudgets(budgets) {
    await storage.save(STORAGE_KEYS.CACHED_BUDGETS, {
      data: budgets,
      timestamp: Date.now(),
    });
  },

  async getCachedBudgets(maxAge = 5 * 60 * 1000) {
    const cached = await storage.get(STORAGE_KEYS.CACHED_BUDGETS);
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > maxAge) {
      await storage.remove(STORAGE_KEYS.CACHED_BUDGETS);
      return null;
    }

    return cached.data;
  },

  async updateLastSync() {
    await storage.save(STORAGE_KEYS.LAST_SYNC, Date.now());
  },

  async getLastSync() {
    return await storage.get(STORAGE_KEYS.LAST_SYNC);
  },
};

export default storage;
