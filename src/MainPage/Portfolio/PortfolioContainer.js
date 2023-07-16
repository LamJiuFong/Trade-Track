import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function PortfolioContainer({portfolio, handleSelectPortfolio, handleDeletePortfolio, handleRenamePortfolio}) {

    const [portfolioName, setPortfolioName] = useState("");
    const [renamePortfolioVisible, setRenamePortfolioVisible] = useState(false);

    const handleTap = () => {
        handleSelectPortfolio(portfolio);
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        handleDeletePortfolio(portfolio);
    };

    const handleClickRename = (event) => {
        event.stopPropagation();
        setRenamePortfolioVisible(true);
    }

    const handleSubmitRename = () => {
        handleRenamePortfolio(portfolio, portfolioName);
        setRenamePortfolioVisible(false);
        setPortfolioName("");
    }

    const handleCancelRename = () => {
        setPortfolioName("");
        setRenamePortfolioVisible(false);
    }

    function renderRenamePortfolioInput() {
        if (renamePortfolioVisible) {
            return (
                <div className="create-portfolio-form-container">
                    <input
                        type="text"
                        value={portfolioName}
                        maxLength={50}
                        onChange={(event) => setPortfolioName(event.target.value)}
                        placeholder="Input a new name for your portfolio"
                        className="create-portfolio-form-input"/>

                    <button 
                        className="create-portfolio-button" onClick={handleSubmitRename}
                        disabled={portfolioName === ""}>
                            RENAME
                    </button>
                    <div className="space"> </div>
                    <button className="create-portfolio-button" onClick={handleCancelRename}>CANCEL</button>
                </div>
            );
        }
    }  

    if (renamePortfolioVisible) {
        return renderRenamePortfolioInput();
    } else {
        return (
            <div onClick={handleTap} onTouchStart={handleTap} className="portfolio-container">
                <div className="portfolio-title-row">
                    <div className="portfolio-title">
                        {portfolio.name ? <>{portfolio.name}</> : <>PORTFOLIO</>}
                        <FontAwesomeIcon icon={faPenToSquare} className="rename-icon" onClick={handleClickRename} />
                    </div>
                    <button 
                        className="remove-portfolio-button" 
                        onClick={handleDelete}>
                        <span>-</span>
                    </button>
                </div>
            </div>
        );
    }
};
