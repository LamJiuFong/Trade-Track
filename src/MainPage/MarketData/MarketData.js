import React, { useEffect, useState } from "react";
import './style.css';
import renderChart from "../utils/chartFetcher";

const MarketData = () => {
  const [ticker, setTicker] =useState('');

 
  const handleTickerChange = (event) => {
    setTicker(event.target.value);
  }
  const handleSubmit = () => {
    renderChart(ticker);
  }

  return (
    <div className="market-data">
      <input type="text" value={ticker} onChange={handleTickerChange} />
      <button onClick={handleSubmit}>submit</button>
      <div id="chart" />
    </div>
  );
};

export default MarketData;