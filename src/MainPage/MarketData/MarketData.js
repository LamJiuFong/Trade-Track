import React, { useContext, useEffect, useState } from "react";
import './style.css';
import renderChart from "../utils/chartFetcher";
import symbolChecker from "../symbolChecker";
import {ToastContainer} from "react-toastify";
import TemporaryModelContext from "../../TempModel/TempModelContext";
import Plotly from "plotly.js";

const MarketData = () => {
  const [ticker, setTicker] =useState('');
  const { chart, setChart, tickerFromModel,  setTickerFromModel } = useContext(TemporaryModelContext);

  useEffect(() => {
    if (chart != null) {
      setTicker(tickerFromModel);
      Plotly.newPlot("chart", chart.chartData, chart.layout, { responsive: true });
    }
  }, [chart, tickerFromModel])
 
  const handleTickerChange = (event) => {
    setTicker(event.target.value.toUpperCase());
  }

  const handleSubmit = async () => {
    var isValid = await symbolChecker(ticker);
    if (isValid) {
      const chart = await renderChart(ticker);
      setChart(chart);
      setTickerFromModel(ticker);
    } 
  }

  return (
    <div className="market-data">
      <div className="input-data-wrapper">
        <div className="input-box">
          <input className="input-symbol" type="text" placeholder="eg. TSLA" value={ticker} onChange={handleTickerChange} />
        </div>
        <button className='submit-button' onClick={handleSubmit}>Search</button>
      </div>
      <div id="chart"></div>
      <ToastContainer/>
    </div>
  );
};

export default MarketData;