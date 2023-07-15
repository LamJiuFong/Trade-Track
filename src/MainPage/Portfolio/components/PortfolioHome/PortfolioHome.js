import { useEffect, useState } from "react";
import Portfolio from "../configuration/Portfolio";
import PortFolioMonitor from "../PortfolioMonitor/PortfolioMonitor";
import "./PortfolioHome.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { userCollection, auth } from "../../../../config/firebase-config";

export default function PortfolioHome({portofolio, setChosePortfolio}) {
    // States
    const [stocks, setStocks] = useState([]);

    //Portfolio or PortfolioMonitor to be shown
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // GET request to the database to fetch the stock which are already in our portfolio
        const fetchData = async () => {
            try {
                setStocks(portofolio.stocks);
            } catch(err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="portfolio-home">
                {!isReady 
                 ? (<div className="portfolio-configuration">
                        <Portfolio stocks={stocks} setStocks={setStocks} portfolio={portofolio}/>
                        <div className="portfolio-home-buttons-container">
                            <button 
                                className="portfolio-home-button"
                                onClick={() => setChosePortfolio(false)}>
                                <span>SWITCH PORTFOLIO</span>
                            </button>
                            <div className="space"> </div>
                            <button 
                                className="portfolio-home-button"
                                onClick={() => setIsReady(true)}
                            >
                                <span>MONITOR PORTFOLIO</span>
                            </button>
                        </div>
                     </div>)
                  : 
                    (<div className="portfolio-monitor">
                        <PortFolioMonitor stocks={stocks} setStocks={setStocks} portfolio={portofolio}/>
                        <div className='portfolio-home-buttons-container'>
                            <button 
                                className="portfolio-home-button"
                                onClick={() => setChosePortfolio(false)}>
                                <span>SWITCH PORTFOLIO</span>
                            </button>
                            <div className="space"> </div>
                            <button 
                                className='portfolio-home-button'
                                onClick={() => setIsReady(false)}
                            >
                                <span>CONFIGURE PORTFOLIO</span>
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );    
}
