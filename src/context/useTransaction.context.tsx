'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { TTransaction } from '@/types/transaction';

type TransactionContextType = {
  transactions: TTransaction[];
  setTransactions: (transactions: TTransaction[]) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({
  children,
  initialTransactions
}: {
  children: ReactNode;
  initialTransactions: TTransaction[];
}) => {
  const [transactions, setTransactions] =
    useState<TTransaction[]>(initialTransactions);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      'useTransactionContext must be used within a TransactionProvider'
    );
  }
  return context;
};
