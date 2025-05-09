import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/Colors';

interface TransactionItemProps {
  title: string;
  amount: number;
  type: string;
  category?: string;
  date: string;
  currency?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ title, amount, type, category, date, currency = 'EGP' }) => {
  const sign = type === 'income' ? '+' : '-';
  const amountColor = type === 'income' ? COLORS.income : COLORS.expense;
  return (
    <View style={styles.transactionItem}>
      <View style={styles.leftContent}>
        <Text style={styles.title}><Icon name="document-text-outline" size={16} /> {title}</Text>
        <Text style={styles.type}><Icon name="cash-outline" size={16} /> {type}</Text>
        {category && <Text style={styles.category}><Icon name="pricetag-outline" size={16} /> {category}</Text>}
      </View>
      <View style={styles.rightContent}>
        <Text style={[styles.amount, { color: amountColor }]}><Icon name="wallet-outline" size={16} /> {sign}{amount} {currency}</Text>
        <Text style={styles.date}><Icon name="calendar-outline" size={16} /> {date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  leftContent: {
    flex: 1,
    gap: 4,
  },
  rightContent: {
    alignItems: 'flex-end',
    gap: 4,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: COLORS.gray[600],
  },
  category: {
    fontSize: 14,
    color: COLORS.gray[600],
  },
  date: {
    fontSize: 14,
    color: COLORS.gray[600],
  },
});

export default TransactionItem;
