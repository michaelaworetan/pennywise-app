import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeProvider';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Layout } from '../../constants/Layout';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleResetPassword = () => {
    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  if (success) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.successContainer}>
          <Text style={[styles.successTitle, { color: colors.success }]}>
            Check your email
          </Text>
          <Text style={[styles.successText, { color: colors.textSecondary }]}>
            We've sent password reset instructions to {email}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Reset your password
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>

        <Input
          label="Email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({});
          }}
          placeholder="your.email@domain.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <Button
          title="Send reset link"
          onPress={handleResetPassword}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Layout.spacing.xxl,
    paddingTop: Layout.spacing.xxxl,
  },
  title: {
    fontSize: Layout.fontSize.xxxl,
    fontWeight: '700',
    marginBottom: Layout.spacing.md,
  },
  description: {
    fontSize: Layout.fontSize.md,
    marginBottom: Layout.spacing.xxxl,
    lineHeight: 22,
  },
  button: {
    marginTop: Layout.spacing.lg,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xxl,
  },
  successTitle: {
    fontSize: Layout.fontSize.xxxl,
    fontWeight: '700',
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  successText: {
    fontSize: Layout.fontSize.md,
    textAlign: 'center',
    lineHeight: 22,
  },
});
