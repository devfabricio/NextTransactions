import styles from '@/app/page.module.css';
import { TransactionListProps } from '@/components/TransactionList/types';
import { TransactionItem } from '@/components/TransactionItem';

export const TransactionList = (props: TransactionListProps) => {
  const { transactions } = props;

  return (
    <div className={styles.list}>
      {transactions.map((item) => (
        <TransactionItem transaction={item} key={item.id} />
      ))}
    </div>
  );
};
