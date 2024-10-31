'use client';
import styles from '@/components/Filter/Filter.module.css';
import { useTransaction } from '@/context/useTransaction.context';
import { useEffect, useState } from 'react';

export const Filter = () => {
  const { transactions, setTransactions, setSearchResults, query, setQuery } =
    useTransaction();
  const [amountOrder, setAmountOrder] = useState('asc');
  const [dateOrder, setDateOrder] = useState('asc');

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
    setDateOrder(dateOrder === 'asc' ? 'desc' : 'asc');
    setTransactions(sortedTransactions);
  };

  return (
    <div className={styles.filters}>
      <span>Sort by:</span>
      <button className={styles.filterButton} onClick={sortTransactionByAmount}>
        Amount
      </button>
      <button className={styles.filterButton} onClick={sortTransactionByDate}>
        Date
      </button>
      <div className={styles.search}>
        <input placeholder="Search" onChange={search} />
      </div>
    </div>
  );
};
