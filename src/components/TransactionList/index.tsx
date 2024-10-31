import { useMemo } from 'react';
import styles from '@/app/page.module.css';
import { TransactionItem } from '@/components/TransactionItem';
import { useTransaction } from '@/context/useTransaction.context';

export const TransactionList = () => {
  const { transactions, searchResults } = useTransaction();

  const transactionList = useMemo(() => {
    return searchResults.length ? searchResults : transactions;
  }, [searchResults, transactions]);

  return (
    <div className={styles.list}>
      {transactionList.map((item) => (
        <TransactionItem transaction={item} key={item.id} />
      ))}
    </div>
  );
};
