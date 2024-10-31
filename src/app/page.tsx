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
  const totalPages = response.totalPages || 0;

  return (
    <TransactionProvider initialTransactions={transactions}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Transactions</h1>
          <Filter />
        </div>
        <TransactionList totalPages={totalPages} />
      </div>
    </TransactionProvider>
  );
}
