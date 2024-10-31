import { transactions } from '@/data/transactions.data';

export class TransactionService {
  static listTransactions() {
    return {
      data: transactions,
      totalPages: Math.ceil(transactions.length / 10)
    };
  }
}
