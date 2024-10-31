'use client';
import styles from '@/components/Filter/Filter.module.css';
import { useTransaction } from '@/context/useTransaction.context';
import { useEffect } from 'react';

export const Filter = () => {
  const { transactions, setTransactions, setSearchResults, query, setQuery } =
    useTransaction();

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
    const sortedTransactions = [...transactions].sort(
      (a, b) => a.amount - b.amount
    );
    setTransactions(sortedTransactions);
  };

  const sortTransactionByDate = () => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
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
