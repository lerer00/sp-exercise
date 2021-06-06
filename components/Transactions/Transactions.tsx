import styles from './transactions.module.css';
import { FunctionComponent } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utilities/fetcher';

interface Props {
}

const Transactions: FunctionComponent<Props> = () => {
    // Those are fetched from here for now but could use the react context provider if I have time.
    const { data: transactions, error: transactionsError } = useSWR(
        () => `/api/transactions`,
        fetcher
    )

    return (
        <>
            <div className={styles.transactions}>
                <ul>
                    {
                        transactions.map((t: any, i: number) => {
                            <li key={i}>{t}</li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Transactions;