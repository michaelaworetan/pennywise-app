import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Layout } from '../../constants/Layout';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { colors, isDark, toggleTheme, themeMode } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.replace('/(tabs)');
    } else {
      setErrors({ general: result.message });
    }
  };

  const handleThemeToggle = () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    toggleTheme(nextTheme);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.brand, { color: colors.primary }]}>PennyWise</Text>
            <Text style={[styles.brandTag, { color: colors.textSecondary }]}>
              MAKE EVERY PENNY COUNT.
            </Text>
          </View>
          <TouchableOpacity onPress={handleThemeToggle} style={styles.themeToggle}>
            <Feather
              name={themeMode === 'dark' ? 'moon' : 'sun'}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome back.</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Build a healthier relationship with money.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Email address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: '', general: '' });
            }}
            placeholder="your.email@domain.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: '', general: '' });
            }}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity
            onPress={() => router.push('/(auth)/forgot-password')}
            style={styles.forgotPassword}
          >
            <Text style={[styles.forgotText, { color: colors.primary }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          {errors.general && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.general}
            </Text>
          )}

          <Button
            title="Log in"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupSection}>
          <Text style={[styles.signupText, { color: colors.textSecondary }]}>
            New to PennyWise?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={[styles.signupLink, { color: colors.primary }]}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Feather name="shield" size={16} color={colors.textSecondary} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Your money story stays private.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Layout.spacing.xxl,
    paddingTop: Layout.spacing.xxxl + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.xxxl,
  },
  brand: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: '700',
  },
  brandTag: {
    fontSize: Layout.fontSize.xs,
    marginTop: Layout.spacing.xs,
  },
  themeToggle: {
    padding: Layout.spacing.sm,
  },
  welcomeSection: {
    marginBottom: Layout.spacing.xxxl,
  },
  title: {
    fontSize: Layout.fontSize.huge,
    fontWeight: '700',
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    fontSize: Layout.fontSize.md,
  },
  form: {
    marginBottom: Layout.spacing.xxl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -Layout.spacing.sm,
    marginBottom: Layout.spacing.xxl,
  },
  forgotText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: '500',
  },
  errorText: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.lg,
    textAlign: 'center',
  },
  loginButton: {
    marginBottom: Layout.spacing.md,
  },
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xxxl,
  },
  signupText: {
    fontSize: Layout.fontSize.md,
  },
  signupLink: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  footerText: {
    fontSize: Layout.fontSize.sm,
  },
});
