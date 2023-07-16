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
      Plotly.newPlot("chart", chart.chartData, chart.layout, { responsive: true, autosizable: true });
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
    } else {
      setTicker("");
      setTickerFromModel("");
    }
  }

  const buildInfoText = () => {
    if (chart !== null) {
      return (
        <div className="info-text-container">
          <span>Tips:</span>
          <span>1. Hover chart to show interactive options.</span>
          <span>2. Hover candlestick to show details of each candle.</span>
          <span>3. When using box/lasso select, double tap chart to remove selection.</span>
          <span>4. Select autoscale or reset axes to scale back to original scale.</span>
        </div>
      );
    }
  }

  const buildChartWithInfo = () => {
    if (chart !== null) {
      return (
        <div className="chart-info-container">
          <div id="chart"></div>
          {buildInfoText()};
        </div>
      );
    }
  }

  return (
    <div className="market-data">
      <div className="input-data-wrapper">
        <div className="input-box">
          <input 
            className="input-symbol" 
            type="text"
            placeholder="eg. TSLA" value={ticker} 
            onChange={handleTickerChange}
            placeholder="Input stock ticker, e.g. AAPL" />
        </div>
        <button 
          className='submit-button' 
          onClick={handleSubmit}
          disabled={ticker === ""}>Search</button>
      </div>
      {buildChartWithInfo()}
      <ToastContainer/>
    </div>
  );
};

export default MarketData;