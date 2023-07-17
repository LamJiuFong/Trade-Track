import { NavLink } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {

    const renderButton = () => {
        return (
            <div>
                <div className="header"> 
                    Unlock the world of investing!  
                </div>
                <div className="content">
                    Immerse yourself in the world of stock trading with our stock simulator. <br/>
                    Gain hands-on experience and test your investment strategies without risking any real money. <br/>
                    Take control of your financial future and explore the world of stocks with confidence.
                </div>
                <div className="button-wrapper">
                    <NavLink to="/Portfolio">
                        <button className="next-button">
                            <span className="shine">Start your investing journey now!</span>
                        </button>                        
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            {renderButton()}
        </div>
    );
}