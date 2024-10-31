import { useEffect, useState } from 'react';
import { useTransaction } from '@/context/useTransaction.context';

export const useFilters = () => {
  const {
    transactions,
    setTransactions,
    setSearchResults,
    filterByPage,
    currentPage,
    query,
    setQuery
  } = useTransaction();

  const [amountSortOrder, setAmountSortOrder] = useState<'asc' | 'desc'>('asc');
  const [dateSortOrder, setDateSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'amount' | 'date'>();

  useEffect(() => {
    sortTransactionByDate();
  }, []);

  useEffect(() => {
    filterByQuery(query);
  }, [query]);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  };

  const filterByQuery = (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.description
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setSearchResults(filteredTransactions);
  };

  const sortTransactionByAmount = () => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (amountSortOrder === 'asc') {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
    setSortBy('amount');
    setAmountSortOrder(amountSortOrder === 'asc' ? 'desc' : 'asc');
    setTransactions(sortedTransactions);
    filterByPage(sortedTransactions, currentPage);
  };

  const sortTransactionByDate = () => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (dateSortOrder === 'asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setSortBy('date');
    setDateSortOrder(dateSortOrder === 'asc' ? 'desc' : 'asc');
    setTransactions(sortedTransactions);
    filterByPage(sortedTransactions, currentPage);
  };

  return {
    amountOrder: amountSortOrder,
    dateOrder: dateSortOrder,
    sortBy,
    search,
    sortTransactionByAmount,
    sortTransactionByDate
  };
};
