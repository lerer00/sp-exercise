import styles from './graph.module.css';
import { FunctionComponent } from 'react';

interface Props {
}

const Graph: FunctionComponent<Props> = () => {
    return (
        <>
            <div className={styles.graph}>
                <h1>Here will lay a graph</h1>
            </div>
        </>
    )
}

export default Graph;