import Plotly from "plotly.js";
import axios from "axios";

async function renderChart(ticker) {

    const symbol = ticker;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1);

    const YOUR_API_KEY = "chkt4rpr01qs2pndl5c0chkt4rpr01qs2pndl5cg";
    
    const historicalData = await axios.get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${Math.floor(startDate.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}&token=${YOUR_API_KEY}`
    );
    
    if (historicalData.data.s !== "ok") {
        console.error("Error fetching data:", historicalData.data.s);
        return;
    }
    
    const trace = {
        x: historicalData.data.t.map((t) => new Date(t * 1000)),
        close: historicalData.data.c,
        high: historicalData.data.h,
        low: historicalData.data.l,
        open: historicalData.data.o,
        type: "candlestick",
        name: symbol,
        showlegend: false,
    };
    
    const volumeTrace = {
        x: historicalData.data.t.map((t) => new Date(t * 1000)),
        y: historicalData.data.v,
        yaxis: "y2",
        type: "bar",
        name: "Volume",
        marker: {
            color: historicalData.data.c.map(
                (close, index) => (close >= historicalData.data.o[index] ? "green" : "red")
            ),
        },
    };
    
    const chartData = [trace, volumeTrace];

    // const chartData = [trace];
    
    if (chartData.length === 0) return;
    
    const layout = {
        title: ticker,
        yaxis: { title: "Price" },
        yaxis2: { title: "Volume", overlaying: "y", side: "right", range: [0, 700000000] },
        xaxis: { rangeslider: { visible: false }, type: "date" },
        dragmode: 'pan',
        selectdirection: 'none',
    };
    

    // chart is the id that plotly will render, should be used in Market Data
    Plotly.newPlot("chart", chartData, layout, { responsive: true });
    
}

export default renderChart;