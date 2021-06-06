import styles from './graph.module.css';
import { FunctionComponent, useEffect, useRef } from 'react';
import { fetcher } from '../../utilities/fetcher';
import { Layer, Line, Stage } from "react-konva";
import useSWR from 'swr';
import { TransactionsHistory } from '../../pages/api/transactions'
import { useResizeDetector } from 'react-resize-detector';

interface Props {
}

const updateChart = (line: any, points: number[]) => {
    line.to({
        points: points
    })
};

function scaleDataToChart(transactions: Array<TransactionsHistory>, graphWidth: number, graphHeight: number): Array<number> {
    // What size you want the chart to be in the container.
    const chartEnd = graphWidth;
    const chartTop = graphHeight / 2;

    // We need to find the highest to scale better.
    let highest = { x: 0, y: Number.MIN_SAFE_INTEGER };

    // Here's the resulting line for the canva.
    let lineData = [];

    let cumulative: number = 0;
    for (var i = 0; i < transactions.length; i++) {
        cumulative += transactions[i].amount;
        highest = { x: 0, y: cumulative };
    }

    // This is to find the % decrease.
    let decrease = ((highest.y - chartTop) / highest.y);
    // This is to find the distance between all points.
    let distance = chartEnd / (transactions.length - 1);

    cumulative = 0;
    for (var i = 0; i < transactions.length; i++) {
        cumulative += transactions[i].amount;
        // This is x.
        lineData.push((i * distance));
        // This is y.
        lineData.push(-(cumulative - (cumulative * decrease)));
    }

    return lineData;
}

const Graph: FunctionComponent<Props> = () => {
    const stageRef = useRef(null);
    const lineRef = useRef(null);

    const { width: graphWidth, height: graphHeight, ref: graphContainerRef } = useResizeDetector();

    // Those are fetched from here for now but could use the react context provider if I have time.
    const { data: transactions, error: transactionsError } = useSWR(
        () => `/api/transactions`,
        fetcher
    )

    useEffect(() => {
        if (graphWidth !== undefined && graphHeight !== undefined && transactions !== undefined) {
            var lineData = scaleDataToChart(transactions, Number(graphWidth), Number(graphHeight));

            const line = lineRef.current;
            updateChart(line, lineData);
        }
    }, [graphWidth, graphHeight]);

    useEffect(() => {
        if (graphWidth !== undefined && graphHeight !== undefined && transactions) {
            var lineData = scaleDataToChart(transactions, Number(graphWidth), Number(graphHeight));

            const line = lineRef.current;
            updateChart(line, lineData);
        }
    }, [transactions]);

    return (
        <>
            <div className={styles.graph} ref={graphContainerRef}>
                <Stage width={graphWidth || 0} height={480} ref={stageRef}>
                    <Layer
                        x={0}
                        y={0}
                    >
                        <Line
                            ref={lineRef}
                            x={0}
                            y={graphHeight || 0}
                            points={[0, 0, 600, 0]}
                            tension={0.2}
                            strokeWidth={2}
                            stroke={'#595959'}
                        />
                    </Layer>
                </Stage>
            </div>
        </>
    )
}

export default Graph;