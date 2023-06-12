import { STOCK_API } from "./stockAPI";
import { TOKEN } from "./stockAPI";
import {v4 as uuidv4} from 'uuid';

const stockFetcher = (stocks, setStocks, profitLossCalculator) => {
    stocks.forEach(async (s) => {
        try {
            const stockName = s.ticker.replace('', '');
            const response = await fetch(
                `${ STOCK_API }/quote?symbol=${stockName}&token=${TOKEN}`
            );

            const data = await response.json();

            const profitLoss = profitLossCalculator(
                s.price,
                data.c,
                s.position,
                s.quantity
            );

            const stockWithPrice = {
                ...s,
                currentPrice: data.c.toFixed(2),
                profitLoss,
            };

            const indexOfStock = stocks.indexOf(s);
            setStocks((stocks) => [
                ...stocks.slice(0, indexOfStock),
                stockWithPrice,
                ...stocks.slice(indexOfStock + 1),
            ]);
        } catch (error) {
            console.log(error);
        }
    });
};

export default stockFetcher;