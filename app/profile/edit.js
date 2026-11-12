import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
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

export default function ProfileEditScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { colors } = useTheme();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currency, setCurrency] = useState('USD');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const result = await updateUser({
        fullName,
        email,
        phone,
        currency,
      });

      if (result.success) {
        Alert.alert('Success', 'Profile updated successfully', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
              <Feather name="user" size={48} color={colors.primary} />
            </View>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={[styles.changePhotoText, { color: colors.primary }]}>
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setErrors({ ...errors, fullName: '' });
              }}
              placeholder="Your full name"
              error={errors.fullName}
            />

            <Input
              label="Email address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: '' });
              }}
              placeholder="your.email@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="Phone number"
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone number"
              keyboardType="phone-pad"
            />

            {/* Currency Selector */}
            <View style={styles.field}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                Currency
              </Text>
              <View style={styles.currencyOptions}>
                {currencies.map((curr) => (
                  <TouchableOpacity
                    key={curr.code}
                    style={[
                      styles.currencyOption,
                      currency === curr.code && [
                        styles.currencyOptionActive,
                        { backgroundColor: colors.primary },
                      ],
                      { borderColor: colors.border },
                    ]}
                    onPress={() => setCurrency(curr.code)}
                  >
                    <Text
                      style={[
                        styles.currencySymbol,
                        { color: currency === curr.code ? '#FFFFFF' : colors.text },
                      ]}
                    >
                      {curr.symbol}
                    </Text>
                    <Text
                      style={[
                        styles.currencyCode,
                        { color: currency === curr.code ? '#FFFFFF' : colors.textSecondary },
                      ]}
                    >
                      {curr.code}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              title="Save changes"
              onPress={handleSave}
              loading={saving}
              style={styles.saveButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xxxl + 20,
    paddingBottom: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: Layout.spacing.sm,
  },
  headerTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xxxl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  changePhotoButton: {
    paddingVertical: Layout.spacing.sm,
  },
  changePhotoText: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  form: {
    marginBottom: Layout.spacing.xxxl,
  },
  field: {
    marginBottom: Layout.spacing.xl,
  },
  fieldLabel: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.md,
    fontWeight: '500',
  },
  currencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.md,
  },
  currencyOption: {
    width: (Layout.window.width - Layout.spacing.xxl * 2 - Layout.spacing.md * 2) / 3,
    paddingVertical: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  currencyOptionActive: {},
  currencySymbol: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: '600',
    marginBottom: Layout.spacing.xs,
  },
  currencyCode: {
    fontSize: Layout.fontSize.sm,
  },
  saveButton: {
    marginTop: Layout.spacing.xxl,
  },
});
