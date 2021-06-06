import Head from 'next/head'
import React from 'react'
import Transactions from '../components/Transactions/Transactions'
import Graph from '../components/Graph/Graph'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Net worth viewer</title>
        <meta name="description" content="Exerise for net worth viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.transactions}>
          <Transactions />
        </div>
        <div className={styles.graph}>
          <Graph />
        </div>
      </main>
    </div>
  )
}
