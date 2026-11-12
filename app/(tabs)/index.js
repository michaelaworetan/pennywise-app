import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import { Card } from '../../components/ui/Card';
import { Layout } from '../../constants/Layout';
import { getCategoryById } from '../../constants/Categories';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { colors, isDark } = useTheme();

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - will be replaced with API calls
  const [balance, setBalance] = useState(3240.0);
  const [income, setIncome] = useState(4500.0);
  const [expenses, setExpenses] = useState(1260.0);
  const [budgetSpent, setBudgetSpent] = useState(1260);
  const [budgetTotal, setBudgetTotal] = useState(2000);

  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: '1',
      title: 'Whole Foods',
      category: 'groceries',
      date: 'Today',
      time: '10:42 AM',
      amount: -86.5,
      type: 'expense',
    },
    {
      id: '2',
      title: 'Morning coffee',
      category: 'food-drink',
      date: 'Today',
      time: '8:15 AM',
      amount: -5.5,
      type: 'expense',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    return `$${Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const budgetPercentage = (budgetSpent / budgetTotal) * 100;
  const budgetRemaining = budgetTotal - budgetSpent;

  const getCategoryIcon = (categoryId) => {
    const category = getCategoryById(categoryId);
    const iconMap = {
      cart: 'shopping-cart',
      coffee: 'coffee',
      car: 'truck',
      'shopping-bag': 'shopping-bag',
      film: 'film',
      receipt: 'file-text',
      heart: 'heart',
      book: 'book',
      'more-horizontal': 'more-horizontal',
      briefcase: 'briefcase',
      'trending-up': 'trending-up',
      'pie-chart': 'pie-chart',
      gift: 'gift',
    };
    return iconMap[category.icon] || 'circle';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Hello, {user?.fullName?.split(' ')[0] || 'Alex'}
          </Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Overview</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Feather name="bell" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Balance Card */}
        <Card variant="primary" style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              <Feather
                name={balanceVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#D4EDE4"
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.balanceAmount}>
            {balanceVisible ? formatCurrency(balance) : '••••••'}
          </Text>
          
          <Text style={styles.balanceDate}>November 2026</Text>

          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Feather name="arrow-down-left" size={16} color="#D4EDE4" />
              </View>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statValue}>{formatCurrency(income)}</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Feather name="arrow-up-right" size={16} color="#D4EDE4" />
              </View>
              <View>
                <Text style={styles.statLabel}>Expenses</Text>
                <Text style={styles.statValue}>{formatCurrency(expenses)}</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Add Transaction Button */}
        <TouchableOpacity
          style={[styles.addTransactionButton, { backgroundColor: colors.primaryLight }]}
          onPress={() => router.push('/transaction/add')}
        >
          <Feather name="plus" size={20} color={colors.primary} />
          <Text style={[styles.addTransactionText, { color: colors.primary }]}>
            Add transaction
          </Text>
          <Feather name="chevron-right" size={20} color={colors.primary} />
        </TouchableOpacity>

        {/* Monthly Budget */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Your monthly budget
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/budgets')}>
              <Text style={[styles.sectionLink, { color: colors.primary }]}>
                Manage
              </Text>
            </TouchableOpacity>
          </View>

          <Card>
            <View style={styles.budgetInfo}>
              <Text style={[styles.budgetText, { color: colors.text }]}>
                {formatCurrency(budgetSpent)} of {formatCurrency(budgetTotal)} spent
              </Text>
              <Text style={[styles.budgetPercentage, { color: colors.text }]}>
                {Math.round(budgetPercentage)}%
              </Text>
            </View>

            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${budgetPercentage}%`,
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            </View>

            <Text style={[styles.budgetRemaining, { color: colors.textSecondary }]}>
              {formatCurrency(budgetRemaining)} left to spend mindfully
            </Text>
          </Card>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent activity
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/activity')}>
              <Text style={[styles.sectionLink, { color: colors.primary }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              onPress={() => router.push(`/transaction/${transaction.id}`)}
            >
              <Card style={styles.transactionCard}>
                <View style={styles.transactionContent}>
                  <View
                    style={[
                      styles.transactionIcon,
                      { backgroundColor: colors.primaryLight },
                    ]}
                  >
                    <Feather
                      name={getCategoryIcon(transaction.category)}
                      size={20}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.transactionDetails}>
                    <Text style={[styles.transactionTitle, { color: colors.text }]}>
                      {transaction.title}
                    </Text>
                    <Text style={[styles.transactionMeta, { color: colors.textSecondary }]}>
                      {transaction.date} · {getCategoryById(transaction.category).name}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color:
                          transaction.type === 'income'
                            ? colors.income
                            : colors.expense,
                      },
                    ]}
                  >
                    {transaction.type === 'income' ? '+' : '−'}
                    {formatCurrency(transaction.amount)}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.xxl,
    paddingTop: Layout.spacing.xxxl + 20,
    paddingBottom: Layout.spacing.lg,
  },
  greeting: {
    fontSize: Layout.fontSize.md,
    marginBottom: Layout.spacing.xs,
  },
  headerTitle: {
    fontSize: Layout.fontSize.xxxl,
    fontWeight: '700',
  },
  notificationButton: {
    padding: Layout.spacing.sm,
  },
  balanceCard: {
    marginHorizontal: Layout.spacing.xxl,
    marginBottom: Layout.spacing.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  balanceLabel: {
    color: '#D4EDE4',
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: Layout.spacing.xs,
  },
  balanceDate: {
    color: '#D4EDE4',
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.xl,
  },
  balanceStats: {
    flexDirection: 'row',
    gap: Layout.spacing.xxxl,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 237, 228, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    color: '#D4EDE4',
    fontSize: Layout.fontSize.xs,
    marginBottom: 2,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  addTransactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Layout.spacing.xxl,
    marginBottom: Layout.spacing.xxl,
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
  },
  addTransactionText: {
    flex: 1,
    marginLeft: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  section: {
    marginBottom: Layout.spacing.xxl,
    paddingHorizontal: Layout.spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
  },
  sectionLink: {
    fontSize: Layout.fontSize.sm,
    fontWeight: '500',
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  budgetText: {
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
  transactionCard: {
    marginBottom: Layout.spacing.md,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionMeta: {
    fontSize: Layout.fontSize.sm,
  },
  transactionAmount: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
  },
  bottomSpace: {
    height: Layout.spacing.xxl,
  },
});
