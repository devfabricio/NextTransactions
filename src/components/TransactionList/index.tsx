import styles from '@/app/page.module.css';
import { TransactionItem } from '@/components/TransactionItem';
import { useTransaction } from '@/context/useTransaction.context';

export const TransactionList = () => {
  const { transactions } = useTransaction();
  return (
    <div className={styles.list}>
      {transactions.map((item) => (
        <TransactionItem transaction={item} key={item.id} />
      ))}
    </div>
  );
};
