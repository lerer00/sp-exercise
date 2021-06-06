import styles from './balance.module.css';
import { FunctionComponent, useEffect, useState } from 'react';
import { TransactionsHistory } from '../../pages/api/transactions'

interface Props {
    transactions: Array<TransactionsHistory>
}

const Balance: FunctionComponent<Props> = ({ transactions }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (transactions !== undefined) {
            let total: number = 0;
            let sortedArrayByDate = transactions.sort((f: TransactionsHistory, s: TransactionsHistory) => {
                if (f.createdAt < s.createdAt)
                    return -1;
                if (f.createdAt > s.createdAt)
                    return -1;

                return 0;
            })

            for (let i = 0; i < sortedArrayByDate.length; i++) {
                total += sortedArrayByDate[i].amount;
            };

            setBalance(total);
        }
    }, [transactions]);

    return (
        <>
            <div className={styles.balance}>
                <h1>Balance: {balance.toFixed(2)}CAD</h1>
            </div>
        </>
    )
}

export default Balance;