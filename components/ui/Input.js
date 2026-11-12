import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Layout } from '../../constants/Layout';

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  icon,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.card,
            borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
          },
        ]}
      >
        {icon && (
          <Feather
            name={icon}
            size={Layout.iconSize.sm}
            color={colors.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              flex: 1,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={isPassword && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={Layout.iconSize.sm}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.lg,
  },
  label: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.sm,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Layout.inputHeight,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  icon: {
    marginRight: Layout.spacing.md,
  },
  input: {
    fontSize: Layout.fontSize.md,
    flex: 1,
  },
  eyeIcon: {
    padding: Layout.spacing.sm,
    marginRight: -Layout.spacing.sm,
  },
  errorText: {
    fontSize: Layout.fontSize.xs,
    marginTop: Layout.spacing.xs,
  },
});

export default Input;
