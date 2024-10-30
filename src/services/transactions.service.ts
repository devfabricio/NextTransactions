import { transactions } from '@/data/transactions.data'

export class TransactionService {
    static listTransactions() {
        return {data: transactions }
    }
}