import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { Layout } from '../../constants/Layout';

export const Button = ({
  title,
  onPress,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'text'
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = [styles.button, { backgroundColor: colors.primary }];

    if (variant === 'secondary') {
      baseStyle.push({ backgroundColor: colors.primaryLight });
    } else if (variant === 'outline') {
      baseStyle.push({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
      });
    } else if (variant === 'text') {
      baseStyle.push({ backgroundColor: 'transparent' });
    }

    if (disabled) {
      baseStyle.push({ backgroundColor: colors.disabled });
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, { color: colors.card }];

    if (variant === 'outline' || variant === 'text') {
      baseStyle.push({ color: colors.primary });
    }

    if (disabled) {
      baseStyle.push({ color: colors.textTertiary });
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'text' ? colors.primary : colors.card} />
      ) : (
        <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: Layout.buttonHeight,
    borderRadius: Layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xl,
  },
  text: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
});

export default Button;
