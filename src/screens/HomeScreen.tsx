import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCard from '../components/HeaderCard';
import TransactionList from '../components/TransactionList';
import COLORS from '../constants/Colors';

const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.headerContainer}>
        <HeaderCard title="Income" amount={1000000} description="Your earnings this month!" color={COLORS.income} />
        <HeaderCard title="Expenses" amount={3000} description="Your expenses this month!" color={COLORS.expense} />
      </View>
      <Text style={styles.transactionsTitle}>Transactions</Text>
      <TransactionList />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});

export default HomeScreen;
