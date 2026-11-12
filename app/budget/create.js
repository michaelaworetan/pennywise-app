import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Button } from '../../components/ui/Button';
import { Layout } from '../../constants/Layout';
import { CategoryPickerModal } from '../../components/pickers/CategoryPickerModal';
import { getCategoryById } from '../../constants/Categories';
import { budgetService } from '../../services/api';

export default function CreateBudgetScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [category, setCategory] = useState('groceries');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('monthly'); // 'weekly', 'monthly', 'yearly'
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const periods = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setSaving(true);
    try {
      const startDate = new Date();
      let endDate = new Date();

      // Calculate end date based on period
      if (period === 'weekly') {
        endDate.setDate(endDate.getDate() + 7);
      } else if (period === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      await budgetService.create({
        category,
        amount: parseFloat(amount),
        period,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      Alert.alert('Success', 'Budget created successfully', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Create budget error:', error);
      Alert.alert('Error', 'Failed to create budget');
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create Budget</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Amount Input */}
          <View style={styles.amountSection}>
            <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>
              BUDGET AMOUNT
            </Text>
            <View style={styles.amountInput}>
              <Text style={[styles.amountCurrency, { color: colors.primary }]}>$</Text>
              <TextInput
                style={[styles.amountValue, { color: colors.primary }]}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={colors.textTertiary}
                autoFocus
              />
            </View>
          </View>

          {/* Category Selector */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Category
            </Text>
            <TouchableOpacity
              style={[styles.fieldInput, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setShowCategoryPicker(true)}
            >
              <Text style={[styles.fieldValue, { color: colors.text }]}>
                {getCategoryById(category)?.name || 'Select category'}
              </Text>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Period Selector */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Period
            </Text>
            <View style={styles.periodOptions}>
              {periods.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={[
                    styles.periodOption,
                    period === p.id && [
                      styles.periodOptionActive,
                      { backgroundColor: colors.primary },
                    ],
                  ]}
                  onPress={() => setPeriod(p.id)}
                >
                  <Text
                    style={[
                      styles.periodOptionText,
                      { color: period === p.id ? '#FFFFFF' : colors.text },
                    ]}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Info Card */}
          <View style={[styles.infoCard, { backgroundColor: colors.primaryLight }]}>
            <Feather name="info" size={20} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.primary }]}>
              You'll receive notifications when you reach 80% and 100% of your budget.
            </Text>
          </View>

          {/* Save Button */}
          <Button
            title="Create Budget"
            onPress={handleSave}
            loading={saving}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>

      {/* Category Picker Modal */}
      <CategoryPickerModal
        visible={showCategoryPicker}
        onClose={() => setShowCategoryPicker(false)}
        onSelect={(selectedCategory) => setCategory(selectedCategory)}
        type="expense"
        selectedCategory={category}
      />
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
  amountSection: {
    marginVertical: Layout.spacing.xxxl,
  },
  amountLabel: {
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  amountCurrency: {
    fontSize: 48,
    fontWeight: '700',
  },
  amountValue: {
    fontSize: 48,
    fontWeight: '700',
    minWidth: 100,
  },
  field: {
    marginBottom: Layout.spacing.xl,
  },
  fieldLabel: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.sm,
    fontWeight: '500',
  },
  fieldInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
  },
  fieldValue: {
    fontSize: Layout.fontSize.md,
    flex: 1,
  },
  periodOptions: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  periodOption: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  periodOptionActive: {},
  periodOptionText: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.xxl,
  },
  infoText: {
    flex: 1,
    fontSize: Layout.fontSize.sm,
    lineHeight: 20,
  },
  saveButton: {
    marginBottom: Layout.spacing.xxxl,
  },
});
