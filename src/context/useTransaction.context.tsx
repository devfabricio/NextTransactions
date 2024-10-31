import { createContext, ReactNode, useState } from 'react';
import { TTransaction } from '@/types/transaction';

type TransactionContextType = {
  transactions: TTransaction[];
  setTransactions: (transactions: TTransaction[]) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<TTransaction[]>([]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = TransactionContext;
  if (!context) {
    throw new Error(
      'useTransactionContext must be used within a TransactionProvider'
    );
  }
  return context;
};
