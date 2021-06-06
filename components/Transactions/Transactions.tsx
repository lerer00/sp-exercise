import styles from './transactions.module.css';
import React, { FunctionComponent } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utilities/fetcher';
import { TransactionsHistory } from '../../pages/api/transactions';
import TimeAgo from 'react-timeago';
import Balance from '../Balance/Balance';

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
                <ul className={styles.transactions}>
                    {transactions !== undefined && transactions.map((t: TransactionsHistory, i: number) => {
                        return <li key={i} className={styles.transaction}>
                            <p>Created at: <TimeAgo date={t.createdAt} /></p>
                            <p>Amount: {t.amount}{t.currency}</p>
                            <p>Type: {t.type}</p>
                        </li>
                    })}
                </ul>
                <div className={styles.balance}>
                    <Balance transactions={transactions}></Balance>
                </div>
            </div>
        </>
    )
}

export default Transactions;