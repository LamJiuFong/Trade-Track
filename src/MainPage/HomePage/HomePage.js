import { NavLink } from "react-router-dom";

export default function HomePage() {

    const renderButton = () => {
        return (
            <div>
                <NavLink to="/Portfolio">
                    <button>Start your investment journey now !</button>
                </NavLink>
            </div>
        );
    }

    return (
        <div>
            {renderButton()}
        </div>
    );
}