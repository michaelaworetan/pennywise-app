import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Layout } from '../../constants/Layout';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, getCategoryById } from '../../constants/Categories';
import { DatePickerModal } from '../../components/pickers/DatePickerModal';
import { CategoryPickerModal } from '../../components/pickers/CategoryPickerModal';
import { transactionService } from '../../services/api';

export default function AddTransactionScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [type, setType] = useState('expense'); // 'expense' or 'income'
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('groceries');
  const [date, setDate] = useState(new Date());
  const [account, setAccount] = useState('Everyday account •• 4821');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleSave = async () => {
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (!merchant.trim()) {
      Alert.alert('Error', 'Please enter a merchant/description');
      return;
    }

    setSaving(true);
    try {
      await transactionService.create({
        type,
        amount: parseFloat(amount),
        title: merchant,
        category,
        date: date.toISOString(),
        account,
        note,
      });

      Alert.alert('Success', 'Transaction added successfully', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Save transaction error:', error);
      Alert.alert('Error', 'Failed to save transaction');
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Add transaction</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container}>
        {/* Type Toggle */}
        <View style={styles.typeToggle}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'expense' && [styles.typeButtonActive, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setType('expense')}
          >
            <Text style={[styles.typeButtonText, { color: type === 'expense' ? '#FFFFFF' : colors.text }]}>
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'income' && [styles.typeButtonActive, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setType('income')}
          >
            <Text style={[styles.typeButtonText, { color: type === 'income' ? '#FFFFFF' : colors.text }]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Amount */}
          <View style={styles.amountSection}>
            <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>AMOUNT</Text>
            <View style={styles.amountInput}>
              <Text style={[styles.amountCurrency, { color: type === 'expense' ? colors.error : colors.success }]}>
                $
              </Text>
              <TextInput
                style={[styles.amountValue, { color: type === 'expense' ? colors.error : colors.success }]}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={colors.textTertiary}
              />
            </View>
          </View>

          {/* Merchant/Description */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Merchant / description
            </Text>
            <View style={[styles.fieldInput, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TextInput
                style={[styles.fieldValue, { color: colors.text }]}
                value={merchant}
                onChangeText={setMerchant}
                placeholder="Enter merchant name"
                placeholderTextColor={colors.textTertiary}
              />
              <Feather name="edit-2" size={16} color={colors.textSecondary} />
            </View>
          </View>

          {/* Category */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Category</Text>
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

          {/* Date */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Date</Text>
            <TouchableOpacity
              style={[styles.fieldInput, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.fieldValue, { color: colors.text }]}>
                {formatDate(date)}
              </Text>
              <Feather name="calendar" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Account */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Paid with</Text>
            <TouchableOpacity style={[styles.fieldInput, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.fieldValue, { color: colors.text }]}>{account}</Text>
              <Feather name="credit-card" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Note */}
          <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Note (optional)</Text>
            <View style={[styles.fieldInput, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TextInput
                style={[styles.fieldValue, { color: colors.text }]}
                value={note}
                onChangeText={setNote}
                placeholder="Add a note"
                placeholderTextColor={colors.textTertiary}
                multiline
              />
            </View>
          </View>

          {/* Save Button */}
          <Button
            title="Save transaction"
            onPress={handleSave}
            loading={saving}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>

      {/* Modals */}
      <DatePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(selectedDate) => setDate(selectedDate)}
        initialDate={date}
      />

      <CategoryPickerModal
        visible={showCategoryPicker}
        onClose={() => setShowCategoryPicker(false)}
        onSelect={(selectedCategory) => setCategory(selectedCategory)}
        type={type}
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
  typeToggle: {
    flexDirection: 'row',
    marginHorizontal: Layout.spacing.xxl,
    marginVertical: Layout.spacing.lg,
    gap: Layout.spacing.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.full,
    alignItems: 'center',
  },
  typeButtonActive: {},
  typeButtonText: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: Layout.spacing.xxl,
  },
  amountSection: {
    marginBottom: Layout.spacing.xxxl,
  },
  amountLabel: {
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: Layout.spacing.md,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amountCurrency: {
    fontSize: 48,
    fontWeight: '700',
  },
  amountValue: {
    fontSize: 48,
    fontWeight: '700',
    flex: 1,
  },
  field: {
    marginBottom: Layout.spacing.xl,
  },
  fieldLabel: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.sm,
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
  saveButton: {
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.xxxl,
  },
});
