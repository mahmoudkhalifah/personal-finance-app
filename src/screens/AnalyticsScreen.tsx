import React, {useMemo} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import {PieChart, BarChart} from 'react-native-chart-kit';
import COLORS from '../constants/Colors';
import {
  TransactionCategory,
  TransactionType,
  useTransactions,
} from '../contexts/TransactionsContext';
import HeaderCard from '../components/HeaderCard';
import {
  getBalance,
  getSpendingPercentage,
  getTotalAmountByCategory,
} from '../utils/transactions';
import {formatAmount} from '../utils/strings';

const screenWidth = Dimensions.get('window').width;

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#FFA726',
  Rent: '#29B6F6',
  Groceries: '#66BB6A',
  Entertainment: '#AB47BC',
  Other: '#FF7043',
};

const formatAmountWithCurrency = (amount: number) =>
  `${formatAmount(amount)} EGP`;

const AnalyticsScreen = () => {
  const {transactions} = useTransactions();

  const {expensesByCategory, incomeByMonth} = useMemo(() => {
    const expenses = transactions.filter(
      t => t.type === TransactionType.Expense,
    );
    const income = transactions.filter(t => t.type === TransactionType.Income);

    // Use getTotalAmountByCategory for each category
    const categoryTotals: Record<TransactionCategory, number> = {} as Record<
      TransactionCategory,
      number
    >;
    Object.values(TransactionCategory).forEach(category => {
      categoryTotals[category] = getTotalAmountByCategory(expenses, category);
    });

    // Calculate income by month with canonical key for sorting
    const monthlyIncomeMap: Record<string, {label: string; amount: number}> =
      {};
    income.forEach(transaction => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const monthNum = date.getMonth() + 1; // 1-based
      const key = `${year}-${String(monthNum).padStart(2, '0')}`; // e.g., "2025-05"
      const label = date.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      if (!monthlyIncomeMap[key]) {
        monthlyIncomeMap[key] = {label, amount: 0};
      }
      monthlyIncomeMap[key].amount += transaction.amount;
    });
    const sortedKeys = Object.keys(monthlyIncomeMap).sort();
    const incomeByMonth = {
      labels: sortedKeys.map(key => monthlyIncomeMap[key].label),
      datasets: [{data: sortedKeys.map(key => monthlyIncomeMap[key].amount)}],
    };

    return {
      expensesByCategory: Object.entries(categoryTotals)
        .filter(([_, amount]) => amount > 0)
        .map(([category, amount]) => ({
          name: category,
          amount,
          color: CATEGORY_COLORS[category] || '#BDBDBD',
          legendFontColor: COLORS.gray[600],
          legendFontSize: 14,
        })),
      incomeByMonth,
    };
  }, [transactions]);

  const totalExpenses = expensesByCategory.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const totalIncome = incomeByMonth.datasets[0].data.reduce(
    (sum, amount) => sum + amount,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <HeaderCard
            title="Balance"
            amount={getBalance(transactions)}
            description="Your current total balance!"
            color={COLORS.income}
          />
          <HeaderCard
            title="Spending"
            amount={getSpendingPercentage(transactions)}
            description="Your spending relative to your income!"
            suffix="%"
            color={COLORS.expense}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expenses by Category</Text>
          <Text style={styles.totalAmount}>
            Total: {formatAmountWithCurrency(totalExpenses)}
          </Text>
          {expensesByCategory.length > 0 ? (
            <>
              <PieChart
                data={expensesByCategory}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                  color: () => 'rgba(0, 0, 0, 1)',
                  labelColor: () => COLORS.gray[600],
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                hasLegend={false}
              />
              <View style={styles.legendContainer}>
                {expensesByCategory.map(item => (
                  <View key={item.name} style={styles.legendRow}>
                    <View style={styles.legendRowContent}>
                      <View
                        style={[
                          styles.legendDot,
                          {backgroundColor: item.color},
                        ]}
                      />
                      <Text style={styles.legendLabel}>{item.name}</Text>
                      <Text style={styles.legendLabel}>
                        {Math.round((item.amount / totalExpenses) * 100)}%
                      </Text>
                    </View>
                    <Text style={styles.legendValue}>
                      {formatAmountWithCurrency(item.amount)}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.noDataText}>No expense data available</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income by Month</Text>
          <Text style={styles.totalAmount}>
            Total: {formatAmountWithCurrency(totalIncome)}
          </Text>
          {incomeByMonth.datasets[0].data.length > 0 ? (
            <BarChart
              data={incomeByMonth}
              width={screenWidth - 100}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              showValuesOnTopOfBars
              fromZero={true}
              chartConfig={{
                backgroundColor: COLORS.white,
                backgroundGradientFrom: COLORS.white,
                backgroundGradientTo: COLORS.white,
                decimalPlaces: 0,
                color: () => COLORS.gray[600],
                labelColor: () => COLORS.gray[600],
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.5,
                propsForBackgroundLines: {
                  stroke: COLORS.gray[200],
                },
              }}
              style={styles.barChart}
            />
          ) : (
            <Text style={styles.noDataText}>No income data available</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.gray[600],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.gray[600],
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 16,
    color: COLORS.gray[500],
    marginBottom: 16,
  },
  noDataText: {
    fontSize: 16,
    color: COLORS.gray[400],
    textAlign: 'center',
    marginTop: 20,
  },
  barChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 15,
    color: COLORS.gray[600],
    marginEnd: 8,
  },
  legendValue: {
    fontSize: 15,
    color: COLORS.gray[500],
    marginLeft: 8,
  },
  legendRowContent: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default AnalyticsScreen;
