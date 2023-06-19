import { STOCK_API, TOKEN } from "./utils/stockAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function symbolChecker(symbol) {
    try {
        const response = await fetch(
            `${STOCK_API}search?q=${symbol}&token=${TOKEN}`
        );
        
        const data = await response.json();

        if (data.count > 0) {
            for (let i = 0; i < data.count; i++) {

                if (data.result[i].displaySymbol === symbol) {
                    return true;

                } else if (i === data.count-1) {
                    toast.error("Invalid symbol");
                    return false;
                }
            }
        } else {
            toast.error("Invalid symbol");
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};
