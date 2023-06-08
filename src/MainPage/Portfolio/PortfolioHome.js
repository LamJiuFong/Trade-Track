import { useState } from "react";
import Portfolio from "./components/configuration/Portfolio";
import PortFolioMonitor from "../PortfolioMonitor/PortfolioMonitor";
import "./PortfolioHome.css";

export default function PortfolioHome() {
    // States
    const [stocks, setStocks] = useState([]);

    //Portfolio or PortfolioMonitor to be shown
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="PortfolioHome">
            <div className="portfolio-home-body">
                {!isReady 
                 ? (<div className="portfolio-configuration">
                        <Portfolio stocks={stocks} setStocks={setStocks}/>
                        <div className="portfolio-button-continue-wrapper">
                            <button 
                                className="portfolio-button-continue"
                                onClick={() => setIsReady(true)}
                            >
                                <span>Continue</span>
                            </button>
                        </div>
                     </div>)
                  : 
                    (<div className="portfolio-monitor">
                        <div className='portfolio-monitor-button-back-wrapper'>
                            <button 
                                className='portfolio-monitor-button-back'
                                onClick={() => setIsReady(false)}
                            >
                                <span>Go back to Portfolio</span>
                            </button>
                        </div>
                        <PortFolioMonitor stocks={stocks} setStocks={setStocks}/>
                    </div>
                )}
            </div>
        </div>
    );    
}
