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

export default function SignUpScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const { colors, isDark, toggleTheme, themeMode } = useTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password = 'Password must contain a number and a symbol';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const result = await register(fullName, email, password);
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
          <Text style={[styles.title, { color: colors.text }]}>A smarter start.</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Create your account. Make room for more.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Full name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              setErrors({ ...errors, fullName: '', general: '' });
            }}
            placeholder="Your full name"
            error={errors.fullName}
          />

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
            placeholder="Create a strong password"
            secureTextEntry
            error={errors.password}
          />

          <Text style={[styles.hint, { color: colors.textTertiary }]}>
            At least 8 characters, a number and a symbol.
          </Text>

          {errors.general && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.general}
            </Text>
          )}

          <Button
            title="Sign up"
            onPress={handleSignUp}
            loading={loading}
            style={styles.signupButton}
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginSection}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.loginLink, { color: colors.primary }]}>Log in</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={[styles.footer, { color: colors.textTertiary }]}>
          Interactive preview · tap fields to fill sample data.
        </Text>
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
  hint: {
    fontSize: Layout.fontSize.xs,
    marginTop: -Layout.spacing.md,
    marginBottom: Layout.spacing.xxl,
  },
  errorText: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.lg,
    textAlign: 'center',
  },
  signupButton: {
    marginBottom: Layout.spacing.md,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xxl,
  },
  loginText: {
    fontSize: Layout.fontSize.md,
  },
  loginLink: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  footer: {
    fontSize: Layout.fontSize.xs,
    textAlign: 'center',
  },
});
