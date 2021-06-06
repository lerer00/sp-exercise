import type { NextApiRequest, NextApiResponse } from 'next'
import { fetcher } from '../../utilities/fetcher'

export type TransactionsHistory = {
  createdAt: Date,
  amount: number,
  currency: string,
  type: string,
  direction: string,
  from?: Object,
  to?: Object
}

export default (_req: NextApiRequest, res: NextApiResponse<TransactionsHistory>) => {
  try {
    var transactionsPromise = fetcher('https://shakepay.github.io/programming-exercise/web/transaction_history.json');
    transactionsPromise.then(result => {
      res.status(200).json(result);
    });
  } catch (e) {
    res.status(500).end();
  }
}
