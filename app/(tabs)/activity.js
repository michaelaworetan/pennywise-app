import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeProvider';
import { Card } from '../../components/ui/Card';
import { Layout } from '../../constants/Layout';
import { getCategoryById } from '../../constants/Categories';

export default function ActivityScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'expenses', 'income'

  // Mock data
  const transactions = [
    {
      id: '1',
      title: 'Whole Foods',
      category: 'groceries',
      date: '2026-11-11',
      time: '10:42 AM',
      amount: -86.5,
      type: 'expense',
    },
    {
      id: '2',
      title: 'Morning coffee',
      category: 'food-drink',
      date: '2026-11-11',
      time: '8:15 AM',
      amount: -5.5,
      type: 'expense',
    },
    {
      id: '3',
      title: 'City transit',
      category: 'transport',
      date: '2026-11-10',
      time: '5:30 PM',
      amount: -18.0,
      type: 'expense',
    },
    {
      id: '4',
      title: 'Freelance project',
      category: 'freelance',
      date: '2026-11-10',
      time: '2:00 PM',
      amount: 450.0,
      type: 'income',
    },
  ];

  const getCategoryIcon = (categoryId) => {
    const category = getCategoryById(categoryId);
    const iconMap = {
      cart: 'shopping-cart',
      coffee: 'coffee',
      car: 'truck',
      'trending-up': 'trending-up',
    };
    return iconMap[category.icon] || 'circle';
  };

  const formatCurrency = (amount) => {
    return `$${Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'expenses' && t.type === 'expense') ||
      (selectedFilter === 'income' && t.type === 'income');
    
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const groupByDate = (transactions) => {
    const groups = {};
    transactions.forEach((t) => {
      const date = t.date;
      const label =
        date === '2026-11-11'
          ? 'Today, November 11'
          : date === '2026-11-10'
          ? 'Yesterday, November 10'
          : date;
      
      if (!groups[label]) groups[label] = [];
      groups[label].push(t);
    });
    return groups;
  };

  const groupedTransactions = groupByDate(filteredTransactions);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search transactions"
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {[
          { key: 'all', label: 'All' },
          { key: 'expenses', label: 'Expenses' },
          { key: 'income', label: 'Income' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && [
                styles.filterTabActive,
                { backgroundColor: colors.primary },
              ],
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                { color: selectedFilter === filter.key ? '#FFFFFF' : colors.text },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {/* Summary Card */}
        {selectedFilter === 'expenses' && (
          <Card variant="primary" style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>NOVEMBER EXPENSES</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalExpenses)}</Text>
            <Text style={styles.summaryMeta}>32 transactions</Text>
          </Card>
        )}

        {/* Transactions List */}
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>{date}</Text>
            
            {transactions.map((transaction) => (
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
                        {transaction.time} · {getCategoryById(transaction.category).name}
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
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.xxl,
    paddingTop: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    height: 44,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
  },
  filterButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.xxl,
    paddingBottom: Layout.spacing.lg,
    gap: Layout.spacing.md,
  },
  filterTab: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
  },
  filterTabActive: {},
  filterTabText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    marginHorizontal: Layout.spacing.xxl,
    marginBottom: Layout.spacing.lg,
  },
  summaryLabel: {
    color: '#D4EDE4',
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: Layout.spacing.sm,
  },
  summaryAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: Layout.spacing.xs,
  },
  summaryMeta: {
    color: '#D4EDE4',
    fontSize: Layout.fontSize.sm,
  },
  dateGroup: {
    marginBottom: Layout.spacing.lg,
  },
  dateLabel: {
    fontSize: Layout.fontSize.sm,
    fontWeight: '600',
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xxl,
  },
  transactionCard: {
    marginHorizontal: Layout.spacing.xxl,
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
