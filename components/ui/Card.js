import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { Layout } from '../../constants/Layout';

export const Card = ({ children, style, variant = 'default' }) => {
  const { colors, isDark } = useTheme();

  const getCardStyle = () => {
    const baseStyle = [
      styles.card,
      {
        backgroundColor: colors.card,
        shadowColor: colors.shadowColor,
      },
    ];

    if (variant === 'primary') {
      baseStyle.push({ backgroundColor: colors.primary });
    }

    return baseStyle;
  };

  return (
    <View style={[...getCardStyle(), !isDark && styles.shadow, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default Card;
