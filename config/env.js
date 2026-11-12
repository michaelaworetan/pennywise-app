import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Get environment from Expo Config or default to development
const ENV = {
  dev: {
    apiUrl: Platform.select({
      ios: 'http://10.109.0.197:5000/api',
      android: 'http://10.109.0.197:5000/api',
      default: 'http://10.109.0.197:5000/api',
    }),
  },
  staging: {
    apiUrl: 'https://staging-api.pennywise.com/api',
  },
  prod: {
    apiUrl: 'https://api.pennywise.com/api',
  },
};

const getEnvVars = (env = Constants.expoConfig?.extra?.environment || 'dev') => {
  if (env === 'prod') {
    return ENV.prod;
  } else if (env === 'staging') {
    return ENV.staging;
  }
  return ENV.dev;
};

export default getEnvVars();
