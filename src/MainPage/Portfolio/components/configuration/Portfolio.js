import React, { useEffect, useState } from "react";
import AddStockInput from "./AddStockInput";
import DATABASE from "../../../utils/database";
import "./Portfolio.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { userCollection, auth } from "../../../../config/firebase-config";

export default function Portfolio({ stocks, setStocks }) {
    const [addStocksVisible, setAddStocksVisible] = useState(false);

    //TODO: handle fetching stock data

    useEffect(() => {
        // GET request to the database to fetch the stock which are already in our portfolio
        const fetchData = async () => {
            try {
                // const response = await fetch(`https://${DATABASE}.json`);
                // const data = await response.json();

                const stocksDoc = await getDoc(doc(userCollection, auth.currentUser.uid));
                const data = stocksDoc.data().stocks;

                // Validate that the database is not empty
                if (data) {
                    // const convertedData = Object.keys(data).map((key) => ({
                    //     id: key,
                    //     ticker: data[key]["ticker"],
                    //     position: data[key]["position"],
                    //     quantity: data[key]["quantity"],
                    //     price: data[key]["price"],
                    // }));
                    // setStocks(convertedData);
                    setStocks(data);
                }
            } catch(err) {
                console.log(err);
            }
        };

        fetchData();
    }, [setStocks]);

    //TODO: handle stock remove
    const handleRemoveStock = async (stock) => {
        try {
            // await fetch(`https://${DATABASE}/${id}.json`, {
            //     method: "DELETE",
            //     "Content-Type": "application/json",
            // });

            const userDoc = await getDoc(doc(userCollection, auth.currentUser.uid));
            const stocks = userDoc.data().stocks;

            const updatedStocks = stocks.filter(s => s.id !== stock.id);
            console.log(updatedStocks);
            
            // update firestore
            setDoc(doc(userCollection, auth.currentUser.uid), {stocks: updatedStocks});

            setStocks(updatedStocks);
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
        <div className="Portfolio">
            <div className="portfolio-main-row-wrapper">
                <div className="portfolio-main-row">Ticker</div>
                <div className="portfolio-main-row">Position</div>
                <div className="portfolio-main-row">Quantity</div>
                <div className="portfolio-main-row">Price</div>
            </div>

            {stocks.map(s => {
                return (
                    <div className="stock-row-wrapper" key={s.id}>
                        <div className="stock-row"> {s.ticker}</div>
                        <div className="stock-row"> {s.position}</div>
                        <div className="stock-row"> {s.quantity}</div>
                        <div className="stock-row"> {s.price}</div>
                        <button 
                            className="button-remove-stock" 
                            onClick={() => handleRemoveStock(s)}
                        >
                            <span>-</span>
                        </button>
                    </div>
                );
            })}

            {renderAddStockInput()}

            <button 
                className="button-add-stock" 
                onClick={() => setAddStocksVisible(true)}
            >
                <span>ADD NEW STOCK</span>
            </button>
            
        </div>
    );
}