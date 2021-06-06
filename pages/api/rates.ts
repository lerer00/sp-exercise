import type { NextApiRequest, NextApiResponse } from 'next'
import { fetcher } from '../../utilities/fetcher'

export type ConversionRates = {
    codes: Object
}

export default (_req: NextApiRequest, res: NextApiResponse<ConversionRates>) => {
    try {
        var ratesResult = fetcher('https://api.shakepay.co/rates');
        ratesResult.then(result => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).end();
    }
}
