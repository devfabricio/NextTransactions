'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { TTransaction } from '@/types/transaction';
import { useSearchParams } from 'next/navigation';

type TransactionContextType = {
  transactions: TTransaction[];
  setTransactions: (transactions: TTransaction[]) => void;
  searchResults: TTransaction[];
  setSearchResults: (transactions: TTransaction[]) => void;
  query: string;
  setQuery: (query: string) => void;
  currentPage: number;
  filterByPage: (page: number) => void;
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
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');

  const [transactions, setTransactions] = useState<TTransaction[]>([]);
  const [searchResults, setSearchResults] = useState<TTransaction[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const currentPageNumber = currentPage ? Number(currentPage) : 1;
    filterByPage(currentPageNumber);
  }, [currentPage]);

  const filterByPage = (page: number) => {
    const start = (page - 1) * 10;
    const end = page * 10;
    const paginatedTransactions = initialTransactions.slice(start, end);
    setTransactions(paginatedTransactions);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        searchResults,
        setSearchResults,
        query,
        setQuery,
        filterByPage,
        currentPage: currentPage ? Number(currentPage) : 1
      }}
    >
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
