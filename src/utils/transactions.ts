import { Transaction, TransactionCategory, TransactionType } from '../contexts/TransactionsContext';


export const getTotalAmountByType = (transactions: Transaction[], type: TransactionType) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return transactions.reduce((acc, transaction) => {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();
        return acc + (transaction.type === type && transactionMonth === currentMonth && transactionYear === currentYear ? transaction.amount : 0);
    }, 0);
};

export const getTotalAmountByCategory = (transactions: Transaction[], category: TransactionCategory) => {
    return transactions.reduce((acc, transaction) => acc + (transaction.category === category ? transaction.amount : 0), 0);
};

export const getBalance = (transactions: Transaction[]) => {
    return getTotalAmountByType(transactions, TransactionType.Income) - getTotalAmountByType(transactions, TransactionType.Expense);
};

export const getSpendingPercentage = (transactions: Transaction[]) => {
    return (getTotalAmountByType(transactions, TransactionType.Expense) / getTotalAmountByType(transactions, TransactionType.Income)) * 100;
};
