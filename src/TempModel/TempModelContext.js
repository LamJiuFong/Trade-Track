import React, { createContext, useState } from 'react';

const TemporaryModelContext = createContext();

export const TemporaryModelProvider = ({ children }) => {
  const [chart, setChart] = useState(null);
  const [tickerFromModel, setTickerFromModel] = useState("");

  return (
    <TemporaryModelContext.Provider value={{ chart, setChart, tickerFromModel, setTickerFromModel }}>
      {children}
    </TemporaryModelContext.Provider>
  );
};

export default TemporaryModelContext;
