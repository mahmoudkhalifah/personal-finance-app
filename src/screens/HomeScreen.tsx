import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCard from '../components/HeaderCard';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/Colors';
import { TransactionType, useTransactions } from '../contexts/TransactionsContext';
import { getTotalAmountByType } from '../utils/transactions';

const HomeScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { transactions } = useTransactions();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <HeaderCard title="Income" amount={getTotalAmountByType(transactions, TransactionType.Income)} description="Your earnings this month!" color={COLORS.income} />
          <HeaderCard title="Expenses" amount={getTotalAmountByType(transactions, TransactionType.Expense)} description="Your expenses this month!" color={COLORS.expense} />
        </View>
        <Text style={styles.transactionsTitle}>Transactions</Text>
        <TransactionList transactions={transactions} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <Icon name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>

      <AddTransactionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.income,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen;
