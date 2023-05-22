import { useState } from "react";
import Portfolio from "./components/configuration/Portfolio";
import "./PortfolioHome.css";

export default function PortfolioHome() {
    // States
    const [stocks, setStocks] = useState([]);
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="Home">
            <header className="tempHeader">
                {/* Just to imagine a Navigation bar here */}
                <h1>Welcome to Stock Portfolio</h1>
            </header>
            <div className="portfolioPageBody">
                {!isReady 
                 ? (<div className="portfolioConfiguration">
                        <Portfolio stocks={stocks} setStocks={setStocks}/>
                        <div className="continueButtonWrapper">
                            <button 
                                className="continueButton"
                                onClick={() => setIsReady(true)}
                            >
                                <span>Continue</span>
                            </button>
                        </div>
                     </div>)
                  : (<div className="portfolioMonitor">Portfolio Monitor Page</div>)  
            }
            </div>
        </div>
    )    
}
