import React, { createContext, useState } from 'react';

const TemporaryModelContext = createContext();

export const TemporaryModelProvider = ({ children }) => {
  const [chart, setChart] = useState(null);
  const [tickerFromModel, setTickerFromModel] = useState("");

  const clearData = () => {
    setChart(null);
    setTickerFromModel("");
  };

  return (
    <TemporaryModelContext.Provider value={{ chart, setChart, tickerFromModel, setTickerFromModel, clearData }}>
      {children}
    </TemporaryModelContext.Provider>
  );
};

export default TemporaryModelContext;
