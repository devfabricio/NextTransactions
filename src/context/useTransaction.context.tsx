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
  paginatedTransactions: TTransaction[];
  setTransactions: (transactions: TTransaction[]) => void;
  searchResults: TTransaction[];
  setSearchResults: (transactions: TTransaction[]) => void;
  query: string;
  setQuery: (query: string) => void;
  currentPage: number;
  filterByPage: (transactions: TTransaction[], page: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
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

  const [transactions, setTransactions] =
    useState<TTransaction[]>(initialTransactions);
  const [paginatedTransactions, setPaginatedTransactions] = useState<
    TTransaction[]
  >([]);
  const [searchResults, setSearchResults] = useState<TTransaction[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentPageNumber = currentPage ? Number(currentPage) : 1;
    filterByPage(transactions, currentPageNumber);
  }, []);

  const filterByPage = (transactions: TTransaction[], page: number) => {
    const start = (page - 1) * 10;
    const end = page * 10;
    const paginatedTransactions = transactions.slice(start, end);
    setPaginatedTransactions(paginatedTransactions);
    setLoading(false);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        paginatedTransactions,
        setTransactions,
        searchResults,
        setSearchResults,
        query,
        setQuery,
        filterByPage,
        currentPage: currentPage ? Number(currentPage) : 1,
        loading,
        setLoading
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
