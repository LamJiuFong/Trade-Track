import { doc, getDoc, setDoc } from "firebase/firestore";
import { userCollection, auth } from "../../config/firebase-config";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import PortfolioHome from "./components/PortfolioHome/PortfolioHome";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import PortfolioContainer from "./PortfolioContainer";

export default function PortfolioManagement() {
    const [portfolioList, setPortfolioList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState({});
    const [createPortfolioVisible, setCreatePortfolioVisible] = useState(false);
    const [portfolioName, setPortfolioName] = useState("");


    useEffect(() => {
        // update the stockList
        const fetchData = async () => {
            const userDoc = await getDoc(doc(userCollection, auth.currentUser.uid));
            const data = userDoc.data().portfolioList;

            if (data) {
                // sort the portfolios according to creation date
                data.sort((a, b) => new Date(a.time) - new Date(b.time));
                setPortfolioList(data);
            }
        }
        fetchData();
    }, []);

    const handleCreate = async (name) => {

        const uniqueId = uuidv4().toString();
        const creationTime = new Date().toISOString();
        const newPortfolio = {id: uniqueId, name: name, time: creationTime, stocks: []}
        
        const updatedPortfolioList = [...portfolioList, newPortfolio];
        setDoc(doc(userCollection, auth.currentUser.uid), {portfolioList: updatedPortfolioList});
        
        const newUserDoc = await getDoc(doc(userCollection, auth.currentUser.uid));
        const data = newUserDoc.data().portfolioList;

        if (data) {
            setPortfolioList(data);
        }
    };

    const handleDeletePortfolio = async (portfolio) => {
        try {
            const updatedPortfolioList = portfolioList.filter(p => p.id !== portfolio.id);
            setDoc(doc(userCollection, auth.currentUser.uid), {portfolioList: updatedPortfolioList});

            const userDoc = await getDoc(doc(userCollection, auth.currentUser.uid));
            const data = userDoc.data().portfolioList;

            if (data) {
                setPortfolioList(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSelectPortfolio = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setIsReady(true);
    };

    const handleRenamePortfolio = async (portfolio, newPortfolioName) => {
        try {
            portfolio.name = newPortfolioName;
            setDoc(doc(userCollection, auth.currentUser.uid), {portfolioList: portfolioList});
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmitCreate = async () => {
        await handleCreate(portfolioName);
        setPortfolioName("");
        setCreatePortfolioVisible(false);
    };

    const handleCancelCreate = () => {
        setPortfolioName("");
        setCreatePortfolioVisible(false);
    }

    function renderCreatePortfolioInput(handleSubmit, handleCancel) {
        if (createPortfolioVisible) {
            return (
                <div className="create-portfolio-form-container">
                    <input
                        type="text"
                        value={portfolioName}
                        maxLength={50}
                        onChange={(event) => setPortfolioName(event.target.value)}
                        placeholder="Input a name for your new portfolio"
                        className="create-portfolio-form-input"/>

                    <button 
                        className="create-portfolio-button" onClick={handleSubmit}
                        disabled={portfolioName === ""}>
                            CREATE
                    </button>
                    <div className="space"> </div>
                    <button className="create-portfolio-button" onClick={handleCancel}>CANCEL</button>
                </div>
            );
        }
    }  

    function renderCreatePortfolioButton() {
        if (!createPortfolioVisible) {
            return <button className="create-portfolio-button" onClick={() => setCreatePortfolioVisible(true)}>
                        <span>CREATE NEW PORTFOLIO</span>
                    </button>
        }
    }


    return (
        isReady 
        ? (<div> 
            <PortfolioHome portofolio={selectedPortfolio} setChosePortfolio={setIsReady} />
           </div>)
        : (<div className="portfolio-management-page">
            <div>
                {portfolioList.map(portfolio => 
                    <PortfolioContainer 
                        portfolio={portfolio}
                        handleDeletePortfolio={handleDeletePortfolio}
                        handleSelectPortfolio={handleSelectPortfolio}
                        handleRenamePortfolio={handleRenamePortfolio}/>)}
            </div>
            
            {renderCreatePortfolioInput(handleSubmitCreate, handleCancelCreate)}

            {renderCreatePortfolioButton()}

           </div>)
    );
}