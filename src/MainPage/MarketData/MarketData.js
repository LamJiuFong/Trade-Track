import React, { useState } from "react";
import './style.css';
import renderChart from "../utils/chartFetcher";
import symbolChecker from "../symbolChecker";
import {ToastContainer} from "react-toastify";

const MarketData = () => {
  const [ticker, setTicker] =useState('');

 
  const handleTickerChange = (event) => {
    setTicker(event.target.value);
  }

  const handleSubmit = async () => {
    var isValid = await symbolChecker(ticker);
    if (isValid) {
      renderChart(ticker);
    } 
  }

  return (
    <div className="market-data">
      <input type="text" value={ticker} onChange={handleTickerChange} />
      <button onClick={handleSubmit}>submit</button>
      <div id="chart" />
      <ToastContainer/>
    </div>
  );
};

export default MarketData;