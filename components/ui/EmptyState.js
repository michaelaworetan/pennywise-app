import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Button } from './Button';
import { Layout } from '../../constants/Layout';

export const EmptyState = ({
  icon = 'inbox',
  title = 'No data yet',
  message = 'Start by adding your first item',
  actionLabel,
  onAction,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
        <Feather name={icon} size={48} color={colors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          style={styles.button}
        />
      )}
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
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xxl,
  },
  title: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: '600',
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  message: {
    fontSize: Layout.fontSize.md,
    textAlign: 'center',
    marginBottom: Layout.spacing.xxl,
    lineHeight: 22,
  },
  button: {
    minWidth: 200,
  },
});

export default EmptyState;
