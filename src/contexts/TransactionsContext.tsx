import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addToLocalStorage, getFromLocalStorage } from '../utils/storage';

export enum TransactionCategory {
  Food = 'Food',
  Rent = 'Rent',
  Groceries = 'Groceries',
  Entertainment = 'Entertainment',
  Other = 'Other',
}

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category?: TransactionCategory;
  date: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(()=>{
    const loadTransactions = async () => {
      const loadedTransactions = await getFromLocalStorage('transactions');
      if (loadedTransactions) {
        setTransactions(loadedTransactions);
      }
    };

    loadTransactions();
  }, []);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    setTransactions(prev => [...prev, newTransaction]);

    addToLocalStorage('transactions', [...transactions, newTransaction]);

  }, [setTransactions, transactions]);

  const value = useMemo(() => ({
    transactions,
    addTransaction,
  }), [transactions, addTransaction]);

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};
