import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { Card } from '../../components/ui/Card';
import { Layout } from '../../constants/Layout';
import { PieChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function ReportsScreen() {
  const { colors, isDark } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const chartData = [
    {
      name: 'Groceries',
      amount: 420,
      color: '#10B981',
      legendFontColor: colors.text,
      legendFontSize: 14,
    },
    {
      name: 'Food & drink',
      amount: 300,
      color: '#F59E0B',
      legendFontColor: colors.text,
      legendFontSize: 14,
    },
    {
      name: 'Transport',
      amount: 180,
      color: '#3B82F6',
      legendFontColor: colors.text,
      legendFontSize: 14,
    },
    {
      name: 'Other',
      amount: 360,
      color: '#6B7280',
      legendFontColor: colors.text,
      legendFontSize: 14,
    },
  ];

  const totalSpent = chartData.reduce((sum, item) => sum + item.amount, 0);
  const income = 4500;
  const expenses = 1260;
  const netCashFlow = income - expenses;

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {[
            { key: 'month', label: 'This month' },
            { key: 'last', label: 'Last month' },
          ].map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodTab,
                selectedPeriod === period.key && [
                  styles.periodTabActive,
                  { backgroundColor: colors.primary },
                ],
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text
                style={[
                  styles.periodTabText,
                  { color: selectedPeriod === period.key ? '#FFFFFF' : colors.text },
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.calendarButton}>
            <Feather name="calendar" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Spending Chart */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Where your money goes
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              November 1–11, 2026
            </Text>

            <Card style={styles.chartCard}>
              <PieChart
                data={chartData}
                width={screenWidth - 80}
                height={200}
                chartConfig={{
                  color: (opacity = 1) => `rgba(26, 26, 26, ${opacity})`,
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="0"
                hasLegend={true}
                center={[0, 0]}
              />
            </Card>

            <Card style={[styles.insightCard, { backgroundColor: colors.primaryLight }]}>
              <Feather name="bar-chart-2" size={20} color={colors.primary} />
              <View style={styles.insightText}>
                <Text style={[styles.insightTitle, { color: colors.primary }]}>
                  Groceries are your top category
                </Text>
                <Text style={[styles.insightDescription, { color: colors.primary }]}>
                  $420 · one third of your spending
                </Text>
              </View>
            </Card>
          </View>

          {/* Income vs Expenses */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Income vs. expenses
            </Text>

            <Card>
              <View style={styles.incomeExpenseRow}>
                <Text style={[styles.incomeExpenseLabel, { color: colors.textSecondary }]}>
                  Income
                </Text>
                <View style={styles.incomeExpenseBar}>
                  <View
                    style={[
                      styles.incomeBar,
                      {
                        width: `${(income / income) * 100}%`,
                        backgroundColor: colors.primary,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.incomeExpenseAmount, { color: colors.text }]}>
                  {formatCurrency(income)}
                </Text>
              </View>

              <View style={styles.incomeExpenseRow}>
                <Text style={[styles.incomeExpenseLabel, { color: colors.textSecondary }]}>
                  Expenses
                </Text>
                <View style={styles.incomeExpenseBar}>
                  <View
                    style={[
                      styles.expenseBar,
                      {
                        width: `${(expenses / income) * 100}%`,
                        backgroundColor: colors.primary,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.incomeExpenseAmount, { color: colors.text }]}>
                  {formatCurrency(expenses)}
                </Text>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.netCashFlow}>
                <Text style={[styles.netCashFlowLabel, { color: colors.textSecondary }]}>
                  NET CASH FLOW
                </Text>
                <Text style={[styles.netCashFlowAmount, { color: colors.success }]}>
                  +{formatCurrency(netCashFlow)}
                </Text>
              </View>
            </Card>
          </View>
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
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.xxl,
    paddingVertical: Layout.spacing.lg,
    gap: Layout.spacing.md,
  },
  periodTab: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.full,
  },
  periodTabActive: {},
  periodTabText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: '600',
  },
  calendarButton: {
    marginLeft: 'auto',
    padding: Layout.spacing.sm,
  },
  content: {
    paddingHorizontal: Layout.spacing.xxl,
  },
  section: {
    marginBottom: Layout.spacing.xxxl,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '600',
    marginBottom: Layout.spacing.xs,
  },
  sectionSubtitle: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.lg,
  },
  chartCard: {
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Layout.spacing.md,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    marginBottom: Layout.spacing.xs,
  },
  insightDescription: {
    fontSize: Layout.fontSize.sm,
  },
  incomeExpenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    gap: Layout.spacing.md,
  },
  incomeExpenseLabel: {
    fontSize: Layout.fontSize.sm,
    width: 70,
  },
  incomeExpenseBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  incomeBar: {
    height: '100%',
  },
  expenseBar: {
    height: '100%',
  },
  incomeExpenseAmount: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    width: 80,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    marginVertical: Layout.spacing.md,
  },
  netCashFlow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  netCashFlowLabel: {
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
  },
  netCashFlowAmount: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '700',
  },
  bottomSpace: {
    height: Layout.spacing.xxl,
  },
});
