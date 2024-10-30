'use client'
import styles from '@/app/page.module.css'
import { TTransaction } from '@/types/transaction'
import { TransactionService } from '@/services/transactions.service'
import {useState, useEffect, useCallback} from 'react'
import Image from "next/image";


export default function Home() {
  const [transactions, setTransactions] = useState<TTransaction[]>([])

  const listTransactions = () => {
    const response = TransactionService.listTransactions()
    setTransactions(response.data)
  }

  useEffect(() => {
    listTransactions()
  }, [])

  const sortTransactionByAmount = () => {
  }

  const sortTransactionByDate = () => {

  }

  const formatAmountToUSD = (amount: number) => {
    return Intl
    .NumberFormat('en-us', {style: 'currency', currency: 'USD'})
    .format(amount)
  }

  const formatDate = (date: Date) => {
    return Intl.DateTimeFormat('en-us').format(date)
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <h1>Transaction List</h1>
        {transactions.map(item => <div className={styles.item} key={item.id}>
          <div>{formatAmountToUSD(item.amount)}</div>
          <div>{formatDate(item.date)}</div>
          <div>{item.description}</div>
        </div>)}
      </div>
    </div>
  );
}
