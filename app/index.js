import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthProvider';
import { useTheme } from '../context/ThemeProvider';
import { Button } from '../components/ui/Button';
import { Layout } from '../constants/Layout';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (!isLoading) {
      // Auto-navigate after 2 seconds
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          router.replace('/(tabs)');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.push('/(auth)/login');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.brandText}>P / W</Text>
        <Text style={styles.tagline}>A LITTLE GOES A LONG WAY</Text>

        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>p.</Text>
          </View>
        </View>

        <Text style={styles.title}>PennyWise</Text>
        <Text style={styles.subtitle}>Make Every Penny Count.</Text>

        <View style={styles.divider} />

        <Text style={styles.description}>Less money stress.</Text>
        <Text style={styles.description}>More life to live.</Text>

        <Button
          title="Get started"
          onPress={handleGetStarted}
          style={styles.button}
          variant="secondary"
        />

        <Text style={styles.footer}>YOUR MONEY. YOUR PACE.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.xxl,
    paddingTop: Layout.spacing.xxxl * 2,
    paddingBottom: Layout.spacing.xxxl,
    alignItems: 'center',
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: Layout.fontSize.xxl,
    fontWeight: '600',
    letterSpacing: 2,
  },
  tagline: {
    color: '#D4EDE4',
    fontSize: Layout.fontSize.xs,
    marginTop: Layout.spacing.xs,
    letterSpacing: 1,
  },
  logoContainer: {
    marginTop: Layout.spacing.xxxl * 2,
    marginBottom: Layout.spacing.xxxl,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D4EDE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  title: {
    color: '#FFFFFF',
    fontSize: Layout.fontSize.huge + 4,
    fontWeight: '700',
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    color: '#D4EDE4',
    fontSize: Layout.fontSize.lg,
    marginBottom: Layout.spacing.xxxl,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#D4EDE4',
    marginVertical: Layout.spacing.xxl,
  },
  description: {
    color: '#FFFFFF',
    fontSize: Layout.fontSize.xxl,
    fontWeight: '500',
    marginBottom: Layout.spacing.sm,
  },
  button: {
    width: '100%',
    marginTop: Layout.spacing.xxxl,
  },
  footer: {
    color: '#D4EDE4',
    fontSize: Layout.fontSize.xs,
    marginTop: 'auto',
    letterSpacing: 1,
  },
});
