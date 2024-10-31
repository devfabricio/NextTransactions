'use client';
import styles from '@/components/Filter/filter.module.css';
import { useTransaction } from '@/context/useTransaction.context';
import { useEffect, useState } from 'react';
import { SortIcon } from '@/components/Filter/icons/SortIcon';

export const Filter = () => {
  const { transactions, setTransactions, setSearchResults, query, setQuery } =
    useTransaction();
  const [amountOrder, setAmountOrder] = useState<'asc' | 'desc'>('asc');
  const [dateOrder, setDateOrder] = useState<'asc' | 'desc'>('asc');
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
      if (amountOrder === 'asc') {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
    setSortBy('amount');
    setAmountOrder(amountOrder === 'asc' ? 'desc' : 'asc');
    setTransactions(sortedTransactions);
  };

  const sortTransactionByDate = () => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (dateOrder === 'asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setSortBy('date');
    setDateOrder(dateOrder === 'asc' ? 'desc' : 'asc');
    setTransactions(sortedTransactions);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <input placeholder="Search" onChange={search} />
      </div>
      <div className={styles.sortContainer}>
        <span>Sort by:</span>
        <button className={styles.sortButton} onClick={sortTransactionByAmount}>
          {sortBy === 'amount' && <SortIcon order={amountOrder} />}{' '}
          <span>Amount</span>
        </button>
        <button className={styles.sortButton} onClick={sortTransactionByDate}>
          {sortBy === 'date' && <SortIcon order={dateOrder} />}{' '}
          <span>Date</span>
        </button>
      </div>
    </div>
  );
};
