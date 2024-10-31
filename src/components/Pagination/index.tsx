'use client';
import styles from '@/components/Pagination/pagination.module.css';
import { PaginationProps } from '@/components/Pagination/types';
import { useRouter } from 'next/navigation';
import { useTransaction } from '@/context/useTransaction.context';

export const Pagination = (props: PaginationProps) => {
  const { totalPages, currentPage } = props;
  const { transactions, setLoading, filterByPage } = useTransaction();
  const router = useRouter();

  const onPageChange = (page: number) => {
    setLoading(true);
    router.push(`/?page=${page}`);
    filterByPage(transactions, page);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.prevButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className={styles.pageNumber}>
        {currentPage} of {totalPages}
      </span>
      <button
        className={styles.nextButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
