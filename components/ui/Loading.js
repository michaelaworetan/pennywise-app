import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { Layout } from '../../constants/Layout';

export const Loading = ({ message = 'Loading...' }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
    </View>
  );
};

export const LoadingSkeleton = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((item) => (
        <View
          key={item}
          style={[styles.skeletonCard, { backgroundColor: colors.card }]}
        >
          <View style={[styles.skeletonLine, { backgroundColor: colors.border }]} />
          <View style={[styles.skeletonLine, { backgroundColor: colors.border, width: '60%' }]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xxl,
  },
  message: {
    marginTop: Layout.spacing.lg,
    fontSize: Layout.fontSize.md,
  },
  skeletonContainer: {
    padding: Layout.spacing.xxl,
  },
  skeletonCard: {
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  skeletonLine: {
    height: 16,
    borderRadius: 4,
    marginBottom: Layout.spacing.md,
  },
});

export default Loading;
