'use client';
import styles from '@/app/page.module.css';
import { TTransaction } from '@/types/transaction';
import { TransactionService } from '@/services/transactions.service';
import { Filter } from '@/components/Filter';
import { TransactionList } from '@/components/TransactionList';
import { TransactionProvider } from '@/context/useTransaction.context';

export default async function Home() {
  const response = await TransactionService.listTransactions();
  const transactions: TTransaction[] = response.data || [];

  return (
    <TransactionProvider initialTransactions={transactions}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Transaction List</h1>
          <Filter />
        </div>
        <TransactionList />
      </div>
    </TransactionProvider>
  );
}
