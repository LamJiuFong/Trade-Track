import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import MainPage from "../../MainPage/main.js";
import LoginPage from "../loginPage/LoginPage";
import { auth, userCollection } from "../../config/firebase-config";

import "./style.css";
import { setDoc, doc } from "firebase/firestore";

export default function RegisterPage() {

    // states
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginSelected, setLoginSelected] = useState(false);
    const [errMsg, setErrMsg] = useState('error');
    const [hasErr, setHasErr] = useState(false);

    // handlers
    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, pass).then(() => {
                // create an empty doc each time we register a new user
                setDoc(doc(userCollection, auth.currentUser.uid), {stocks: []});
            });
            setIsLoggedIn(true);
            setHasErr(false);
        } catch (err) {
            console.log(err.code);
            handleError(err.code);
        }
    }

    function handleError(code) {
        setHasErr(true);
        if (code === 'auth/invalid-email') {
            setErrMsg('Invalid email');
            setEmail('');
            setPass('');
        } else if (code === 'auth/email-already-in-use') {
            setErrMsg('Email already registered, please proceed to login');
            setPass('');
        } else if (code === 'auth/weak-password') {
            setErrMsg('Password should be at least 6 characters');
            setPass('');
        } else if (code === 'auth/missing-password') {
            setErrMsg('Missing password');
        }
    }

    function renderErrMessage() {
        if (hasErr) {
            return <div className="error">{errMsg}</div>;
        }
    }

    // render form ui
    const renderForm = (
        <>
            <div className="inputContainer">
                <label> Email:  </label>
                <input 
                    type = "text"
                    className="registerInput"
                    name = "email"
                    value = {email}
                    onChange = {(event) => setEmail(event.target.value)}/>
            </div>
            <div className="inputContainer">
                <label> Password: </label>
                <input
                    type = "password"
                    className="registerInput"
                    name = "pass"
                    value = {pass}
                    onChange = {(event) => setPass(event.target.value)}/>
            </div>
            {renderErrMessage()}
            <div className="submitButton">
                <button className="registerButton" onClick={handleRegister}>
                    register 
                </button>
            </div>

            <div className="submitButton">
                <button className="loginButton" 
                        onClick={() => setLoginSelected(true)}
                >
                    login
                </button>
            </div>
        </>
    )

    return (
        <div class="app">
            {isLoggedIn 
             ? <MainPage/> // route to home page 
             : loginSelected
             ? <LoginPage />
             : <>
               <h1 class = "title">Welcome to our page!</h1>
               <h2 class = "smallTitle">Register</h2>
                {renderForm}
               </>
            }
        </div>
    )

}