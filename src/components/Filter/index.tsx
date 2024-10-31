import styles from '@/app/page.module.css';
import { useState } from 'react';
import { TTransaction } from '@/types/transaction';

export const Filter = () => {
  const [transactions, setTransactions] = useState<TTransaction[]>([]);

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
      <input className={styles.search} placeholder="Search" />
    </div>
  );
};