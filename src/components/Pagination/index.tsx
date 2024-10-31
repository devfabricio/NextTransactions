'use client';
import styles from '@/components/Pagination/Pagination.module.css';
import { PaginationProps } from '@/components/Pagination/types';
import { useRouter } from 'next/navigation';

export const Pagination = (props: PaginationProps) => {
  const router = useRouter();
  const { totalPages, currentPage } = props;

  const onPageChange = (page: number) => {
    router.push(`/?page=${page}`);
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
