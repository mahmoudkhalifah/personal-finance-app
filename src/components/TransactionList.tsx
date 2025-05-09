import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TransactionItem from './TransactionItem';
import FilterBar from './FilterBar';
import COLORS from '../constants/Colors';

export type FilterType = 'all' | TransactionType;

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

enum TransactionCategory {
  Food = 'Food',
  Rent = 'Rent',
  Groceries = 'Groceries',
  Entertainment = 'Entertainment',
  Other = 'Other',
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category?: string;
  date: string;
}

const TransactionList: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const filters: FilterType[] = ['all', TransactionType.Income, TransactionType.Expense];

  const transactions: Transaction[] = [
    {
      id: '1', title: 'Salary', amount: 5000, date: '2023-10-01',
      type: TransactionType.Income,
    },
    {
      id: '2', title: 'Rent', amount: 1500, date: '2023-10-05',
      type: TransactionType.Expense,
      category: TransactionCategory.Rent,
    },
    {
      id: '3', title: 'Groceries', amount: 200, date: '2023-10-10',
      category: TransactionCategory.Groceries,
      type: TransactionType.Expense,
    },
  ];

  const filteredTransactions = selectedFilter === 'all' ? transactions : transactions.filter(t => t.type === selectedFilter);

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const renderItem = ({ item }: { item: Transaction }) => (
    <TransactionItem
      title={item.title}
      amount={item.amount}
      type={item.type}
      category={item.category}
      date={item.date}
    />
  );

  return (
    <>
    <View style={styles.sortAndFilterContainer}>
      <FilterBar selectedFilter={selectedFilter} onFilterChange={(filter: string) => setSelectedFilter(filter as FilterType)} filters={filters} />
      <TouchableOpacity
        onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        style={styles.sortButton}
      >
        <Text style={styles.sortButtonText}>Sort by Date</Text>
        <Icon
          name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
          size={20}
          color={COLORS.gray[600]}
        />
      </TouchableOpacity>
    </View>
      <FlatList
        data={sortedTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        scrollEnabled={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 12,
    color: COLORS.gray[600],
    marginEnd: 4,
  },
  sortAndFilterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default TransactionList;
