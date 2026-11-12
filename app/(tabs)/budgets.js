import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Layout } from '../../constants/Layout';

export default function BudgetsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const budgets = [
    { id: '1', category: 'Groceries', spent: 420, total: 500, percentage: 84 },
    { id: '2', category: 'Transport', spent: 180, total: 300, percentage: 60 },
    { id: '3', category: 'Food & drink', spent: 300, total: 400, percentage: 75 },
  ];

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Button
            title="Create budget"
            onPress={() => router.push('/budget/create')}
            style={styles.createButton}
          />
        </View>

        <View style={styles.content}>
          {budgets.map((budget) => (
            <Card key={budget.id} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <Text style={[styles.budgetCategory, { color: colors.text }]}>
                  {budget.category}
                </Text>
                <TouchableOpacity>
                  <Feather name="more-horizontal" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.budgetInfo}>
                <Text style={[styles.budgetAmount, { color: colors.text }]}>
                  {formatCurrency(budget.spent)} of {formatCurrency(budget.total)}
                </Text>
                <Text style={[styles.budgetPercentage, { color: colors.text }]}>
                  {budget.percentage}%
                </Text>
              </View>

              <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${budget.percentage}%`,
                      backgroundColor:
                        budget.percentage >= 80 ? colors.warning : colors.primary,
                    },
                  ]}
                />
              </View>

              <Text style={[styles.budgetRemaining, { color: colors.textSecondary }]}>
                {formatCurrency(budget.total - budget.spent)} remaining
              </Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Layout.spacing.xxl,
    paddingBottom: Layout.spacing.lg,
  },
  createButton: {
    width: '100%',
  },
  content: {
    paddingHorizontal: Layout.spacing.xxl,
  },
  budgetCard: {
    marginBottom: Layout.spacing.lg,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  budgetCategory: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  budgetAmount: {
    fontSize: Layout.fontSize.md,
  },
  budgetPercentage: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetRemaining: {
    fontSize: Layout.fontSize.sm,
  },
});
