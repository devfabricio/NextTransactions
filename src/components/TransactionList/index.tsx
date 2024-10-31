'use client';
import { useMemo } from 'react';
import styles from '@/components/TransactionList/transactionList.module.css';
import { TransactionItem } from '@/components/TransactionItem';
import { useTransaction } from '@/context/useTransaction.context';
import { Pagination } from '@/components/Pagination';
import { TransactionListProps } from '@/components/TransactionList/types';

export const TransactionList = (props: TransactionListProps) => {
  const { paginatedTransactions, searchResults, loading, query, currentPage } =
    useTransaction();
  const { totalPages } = props;

  const transactionList = useMemo(() => {
    return searchResults.length || query
      ? searchResults
      : paginatedTransactions;
  }, [searchResults, paginatedTransactions, query]);

  return (
    <>
      {loading ? (
        <div className={styles.spinner} />
      ) : (
        <div className={styles.list}>
          {transactionList.map((item) => (
            <TransactionItem transaction={item} key={item.id} />
          ))}
        </div>
      )}
      {!query && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
};
