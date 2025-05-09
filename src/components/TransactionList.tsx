import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TransactionItem from './TransactionItem';
import FilterBar from './FilterBar';
import COLORS from '../constants/Colors';
import { Transaction, TransactionType } from '../contexts/TransactionsContext';

export type FilterType = 'all' | TransactionType;
interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const filters: FilterType[] = ['all', TransactionType.Income, TransactionType.Expense];

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

  if(transactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="document-text-outline" size={100} color={COLORS.gray[400]} />
        <Text style={styles.emptyText}>No transactions Found!</Text>
      </View>
    );
  }

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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray[400],
  },
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
