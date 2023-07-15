import React, { useEffect, useState } from "react";
import AddStockInput from "./AddStockInput";
import "./Portfolio.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { userCollection, auth } from "../../../../config/firebase-config";

export default function Portfolio({ stocks, setStocks, portfolio }) {
    const [addStocksVisible, setAddStocksVisible] = useState(false);

    //TODO: handle stock remove
    const handleRemoveStock = async (stock) => {
        try {
            const stocks = portfolio.stocks;
            const updatedStocks = stocks.filter(s => s.id !== stock.id);
            
            portfolio.stocks = updatedStocks;

            var userDoc = await getDoc(doc(userCollection, auth.currentUser.uid));
            const portfolioList = userDoc.data().portfolioList;

            const removedPortfolioList = portfolioList.filter(p => p.id !== portfolio.id);
            const updatedPortfolioList = [...removedPortfolioList, portfolio];

            setDoc(doc(userCollection, auth.currentUser.uid), {portfolioList: updatedPortfolioList});

            userDoc = await getDoc(doc(userCollection, auth.currentUser.uid));
            const data = userDoc.data().portfolioList;

            if (data) {
                setStocks(updatedStocks);
            }
        } catch (err) {
            console.log(err);
        }
    };

    function renderAddStockInput() {
        if (addStocksVisible) {
            return <AddStockInput 
                        setAddStocksVisibility={setAddStocksVisible} 
                        setStocks = {setStocks}
                        portfolio = {portfolio}/>
        }
    }  

    function renderAddStockButton() {
        if (!addStocksVisible) {
            return <button className="button-add-stock" onClick={() => setAddStocksVisible(true)}>
                        <span>ADD NEW STOCK</span>
                    </button>
        }
    }

    return (
        <div className="portfolio-configuration-page-container">
            <div className="portfolio-configuration-container">
                <div className="portfolio-main-row-wrapper">
                    <div className="portfolio-main-row">Ticker</div>
                    <div className="portfolio-main-row">Position</div>
                    <div className="portfolio-main-row">Quantity</div>
                    <div className="portfolio-main-row">Price</div>
                </div>

                <div className="portfolio-configuration-stocks-container">
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
                </div>

                {renderAddStockInput()}

                {renderAddStockButton()}

            </div>
        </div>
    );
}