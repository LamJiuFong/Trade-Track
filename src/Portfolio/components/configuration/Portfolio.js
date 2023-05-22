import { useEffect, useState } from "react";
import AddStockInput from "./AddStockInput";
import DATABASE from "../../utils/database";
import "./Portfolio.css";

export default function Portfolio({stocks, setStocks}) {
    const [addStocksVisible, setAddStocksVisible] = useState(false);

    //TODO: handle fetching stock data

    useEffect(() => {
        // GET request to the database to fetch the stock which are already in our portfolio
        const fetchData = async () => {
            try {
                const response = await fetch(`https://${DATABASE}.json`);
                const data = await response.json();

                // Validate that the database is not empty
                if (data) {
                    const convertedData = Object.keys(data).map((key) => ({
                        id: key,
                        ticker: data[key]["ticker"],
                        position: data[key]["position"],
                        quantity: data[key]["quantity"],
                        price: data[key]["price"],
                    }));
                    setStocks(convertedData);
                }
            } catch(err) {
                console.log(err);
            }
        };

        fetchData();
    }, [setStocks]);

    //TODO: handle stock remove
    const handleRemoveStock = async (id) => {
        try {
            await fetch(`https://${DATABASE}/${id}.json`, {
                method: "DELETE",
                "Content-Type": "application/json",
            });

            setStocks(stocks.filter(s => s.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    function renderAddStockInput() {
        if (addStocksVisible) {
            return <AddStockInput 
                        setAddStocksVisibility={setAddStocksVisible} 
                        setStocks = {setStocks}/>
        }
    }  

    return (
        <div className="portfolioPage">
            <div className="portfolioMainRowWrapper">
                <div className="portfolioMainRow">Ticker</div>
                <div className="portfolioMainRow">Position</div>
                <div className="portfolioMainRow">Quantity</div>
                <div className="portfolioMainRow">Price</div>
            </div>

            {stocks.map(s => {
                return (
                    <div className="portfolioRowWrapper" key={s.id}>
                        <div className="portfolioRow"> {s.ticker}</div>
                        <div className="portfolioRow"> {s.position}</div>
                        <div className="portfolioRow"> {s.quantity}</div>
                        <div className="portfolioRow"> {s.price}</div>
                        <button 
                            className="removeButton" 
                            onClick={() => handleRemoveStock(s.id)}
                        >
                            <span>-</span>
                        </button>
                    </div>
                );
            })}

            {renderAddStockInput()}

            <button 
                className="addStockButton" 
                onClick={() => setAddStocksVisible(true)}
            >
                <span>ADD NEW STOCK</span>
            </button>
            
        </div>
    );
}