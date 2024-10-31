import styles from '@/components/TransactionItem/transactionItem.module.css';
import { TransactionItemProps } from '@/components/TransactionItem/types';

export const TransactionItem = (props: TransactionItemProps) => {
  const { transaction } = props;
  const formatAmountToUSD = (amount: number) => {
    return Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return Intl.DateTimeFormat('en-us').format(date);
  };

  return (
    <div className={styles.item} key={transaction.id}>
      <div className={styles.date}>{formatDate(transaction.date)}</div>
      <div className={styles.description}>{transaction.description}</div>
      <div className={styles.amount}>
        {formatAmountToUSD(transaction.amount)}
      </div>
    </div>
  );
};
