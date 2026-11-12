import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Layout } from '../../constants/Layout';
import { getCategoryById } from '../../constants/Categories';
import axios from 'axios';

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors, isDark } = useTheme();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Mock data for now - will be replaced with API call
  useEffect(() => {
    loadTransaction();
  }, [id]);

  const loadTransaction = () => {
    // Mock data - replace with actual API call
    const mockTransaction = {
      id,
      title: 'Whole Foods',
      amount: 86.50,
      category: 'groceries',
      date: '2026-11-11',
      time: '10:42 AM',
      type: 'expense',
      account: 'Everyday account •• 4821',
      note: 'Weekly groceries',
    };
    setTransaction(mockTransaction);
    setLoading(false);
  };

  const handleEdit = () => {
    router.push({
      pathname: '/transaction/edit/[id]',
      params: { id },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      // API call would go here
      // await axios.delete(`/api/transactions/${id}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      Alert.alert('Success', 'Transaction deleted successfully', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete transaction');
    } finally {
      setDeleting(false);
    }
  };

  const formatCurrency = (amount) => {
    return `$${Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="chevron-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Transaction</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Transaction not found
        </Text>
      </View>
    );
  }

  const category = getCategoryById(transaction.category);
  const isExpense = transaction.type === 'expense';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Transaction</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Feather name="edit-2" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Amount Card */}
        <Card style={styles.amountCard}>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.amountLabel,
                { color: isExpense ? colors.error : colors.success },
              ]}
            >
              {isExpense ? 'EXPENSE' : 'INCOME'}
            </Text>
            <Text
              style={[
                styles.amount,
                { color: isExpense ? colors.error : colors.success },
              ]}
            >
              {isExpense ? '−' : '+'}
              {formatCurrency(transaction.amount)}
            </Text>
          </View>
        </Card>

        {/* Details Card */}
        <Card style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Feather name="file-text" size={20} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Description
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {transaction.title}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.detailRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Feather name="tag" size={20} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Category
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {category.name}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.detailRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Feather name="calendar" size={20} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Date
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {formatDate(transaction.date)}
              </Text>
              <Text style={[styles.detailTime, { color: colors.textTertiary }]}>
                {transaction.time}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.detailRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Feather name="credit-card" size={20} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                Paid with
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {transaction.account}
              </Text>
            </View>
          </View>

          {transaction.note && (
            <>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.detailRow}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
                  <Feather name="message-square" size={20} color={colors.primary} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                    Note
                  </Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>
                    {transaction.note}
                  </Text>
                </View>
              </View>
            </>
          )}
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            title="Edit Transaction"
            onPress={handleEdit}
            variant="outline"
            style={styles.editButtonFull}
          />
          <Button
            title={deleting ? "Deleting..." : "Delete Transaction"}
            onPress={handleDelete}
            variant="text"
            loading={deleting}
            style={styles.deleteButton}
            textStyle={{ color: colors.error }}
          />
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  editButton: {
    padding: Layout.spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Layout.fontSize.md,
  },
  errorText: {
    fontSize: Layout.fontSize.md,
    textAlign: 'center',
    marginTop: Layout.spacing.xxxl,
  },
  content: {
    flex: 1,
  },
  amountCard: {
    marginHorizontal: Layout.spacing.xxl,
    marginTop: Layout.spacing.xxl,
    marginBottom: Layout.spacing.lg,
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.lg,
  },
  amountLabel: {
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: Layout.spacing.md,
  },
  amount: {
    fontSize: 48,
    fontWeight: '700',
  },
  detailsCard: {
    marginHorizontal: Layout.spacing.xxl,
    marginBottom: Layout.spacing.xxl,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Layout.spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.lg,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.xs,
  },
  detailValue: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  detailTime: {
    fontSize: Layout.fontSize.sm,
    marginTop: Layout.spacing.xs,
  },
  divider: {
    height: 1,
    marginVertical: Layout.spacing.sm,
  },
  actions: {
    paddingHorizontal: Layout.spacing.xxl,
  },
  editButtonFull: {
    marginBottom: Layout.spacing.md,
  },
  deleteButton: {
    marginBottom: Layout.spacing.lg,
  },
  bottomSpace: {
    height: Layout.spacing.xxl,
  },
});
