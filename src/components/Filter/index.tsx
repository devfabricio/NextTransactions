'use client';
import styles from '@/components/Filter/filter.module.css';
import { SortIcon } from '@/components/Filter/icons/SortIcon';
import { useFilters } from '@/hooks/useFilters';

export const Filter = () => {
  const {
    sortBy,
    amountOrder,
    dateOrder,
    search,
    sortTransactionByDate,
    sortTransactionByAmount
  } = useFilters();

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
