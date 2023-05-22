import React, { useRef, useState } from "react";
import "./style.css";
import PortfolioHome from "../Portfolio/PortfolioHome";

export default function LoginPage() {
    // states
    const [username, setUsernameState] = useState("");
    const [password, setPasswordState] = useState("");
    const [isSubmitted, setIsSubmittedState] = useState(false);
    const [errorType, setErrorTypeState] = useState("");

    // references
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    // handlers
    const handleUnameChange = (event) => {
        setUsernameState(event.target.value);
    }

    const handlePassChange = (event) => {
        setPasswordState(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var {uname , pass} = document.forms[0];

        // find user info
        const userInfo = database.find(x => x.username == uname.value);
        if (userInfo) {
            if (userInfo.password == pass.value) {
                setIsSubmittedState(true);
            } else {
                setErrorTypeState("wrong password");
                setPasswordState("");
                passwordRef.current.focus();
            }
        } else {
            setErrorTypeState("wrong username");
            setUsernameState("");
            setPasswordState("");
            usernameRef.current.focus();
        }
    }

    // render error message
    function renderErrorMessage(name) {
        if (name == errorType) {
            return name == "wrong username"
                   ? <div class = "error">Invalid Username</div>
                   : <div class = "error">Wrong Password</div>;
        }
    }

    // render form ui
    const renderForm = (
        <form onSubmit={handleSubmit}>
            <div className="inputContainer">
                <label> Username:  </label>
                <input 
                    type = "text"
                    className="loginInput"
                    ref={usernameRef}
                    name = "uname"
                    value = {username}
                    onChange = {handleUnameChange}></input>
                {renderErrorMessage("wrong username")}
            </div>
            <div className="inputContainer">
                <label> Password: </label>
                <input
                    type = "password"
                    className="loginInput"
                    ref={passwordRef}
                    name = "pass"
                    value = {password}
                    onChange = {handlePassChange}></input>
                {renderErrorMessage("wrong password")}
            </div>
            <div className="submitButton">
                <button className="loginButton" onClick={handleSubmit}> login </button>
            </div>
        </form>
    )


    return (
        <div class="app">
            {isSubmitted 
             ? <PortfolioHome/> // route to home page 
             : <>
               <h1 class = "title">Welcome to our page!</h1>
               <h2 class = "smallTitle">Sign In</h2>
                {renderForm}
               </>
             }
        </div>
    )
}