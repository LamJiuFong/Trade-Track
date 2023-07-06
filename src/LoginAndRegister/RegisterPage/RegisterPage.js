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
            setErrMsg('Email has already been registered, please proceed to login');
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
        <div className="register-form-container">
            <h2 className = "register-form-title">Create new account</h2>
            <div className="input-container">
                <label className="input-container-label"> Email:  </label>
                <input 
                    type = "text"
                    className="input-container-input"
                    autoComplete="off"
                    name = "email"
                    value = {email}
                    onChange = {(event) => setEmail(event.target.value)}/>
            </div>
            <div className="input-container">
                <label className="input-container-label"> Password: </label>
                <input
                    type = "password"
                    className="input-container-input"
                    autoComplete="off"
                    name = "pass"
                    value = {pass}
                    onChange = {(event) => setPass(event.target.value)}/>
            </div>
            {renderErrMessage()}
            <div className="register-button-container">
                <button className="register-button" onClick={handleRegister}>
                    Register 
                </button>
            </div>

            <div className="sign-in-container">
                <div className="sign-in-label">
                    Already have an account?
                </div>
                <div className="sign-in" onClick={() => setLoginSelected(true)}>
                    Sign in
                </div>
            </div>
        </div>
    )

    const renderTitle = (
        <div className="title-container">
            <h1 className="animated-title">
                <span>T</span>
                <span>R</span>
                <span>A</span>
                <span>D</span>
                <span>E</span>
                <span> </span>
                <span>T</span>
                <span>R</span>
                <span>A</span>
                <span>C</span>
                <span>K</span>

            </h1>
        </div>
    );


    const renderRegisterPage = (
        <div className="register-page">
            <>{renderForm}</>
            <>{renderTitle}</>
        </div>
    );

    return (
        <div>
            {isLoggedIn 
             ? <MainPage/> // route to home page 
             : loginSelected
             ? <LoginPage />
             : <>{renderRegisterPage}</>
            }
        </div>
    )

}