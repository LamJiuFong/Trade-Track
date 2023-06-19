import React, { useState } from "react";
import "./style.css";
import MainPage from "../../MainPage/main";
import { signInWithEmailAndPassword , sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../config/firebase-config";
import RegisterPage from "../RegisterPage/RegisterPage";


export default function LoginPage() {
    // states
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [registerSelected, setRegisterSelected] = useState(false);
    const [errMsg, setErrMsg] = useState('error');
    const [hasErr, setHasErr] = useState(false);

    // handlers
    const handleLogin = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, pass);
            console.log(user);
            setIsLoggedIn(true);
            setHasErr(false);
        } catch (err) {
            console.log(err);
            handleError(err.code);
        }
    }

    const handleError = (code) => {
        setHasErr(true);
        if (code === 'auth/user-not-found') {
            setErrMsg('User not registered');
            setEmail("");
            setPass("");
        } else if (code === 'auth/invalid-email') {
            setErrMsg('Invalid email');
            setEmail("");
            setPass("");
        } else if (code === 'auth/wrong-password') {
            setErrMsg('Wrong password');
            setPass("");
        } else if (code === 'auth/missing-email') {
            setErrMsg('Please enter an email');
        }
    }

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setHasErr(false);
        } catch (err) {
            console.log(err);
            handleError(err.code);
        }
    }


    const renderErrMessage = () => {
        if (hasErr) {
            return <div className="error">{errMsg}</div>
        }
    }

    // render form ui
    const renderForm = (
        <>
            <div className="inputContainer">
                <label> Email:  </label>
                <input 
                    type = "text"
                    className="loginInput"
                    name = "email"
                    value = {email}
                    onChange = {(event) => setEmail(event.target.value)}/>
            </div>
            <div className="inputContainer">
                <label> Password: </label>
                <input
                    type = "password"
                    className="loginInput"
                    name = "pass"
                    value = {pass}
                    onChange = {(event) => setPass(event.target.value)}/>
                <div className="forgotPassword" onClick={handleForgotPassword}>
                    Forgot Password?
                </div>
            </div>
            {renderErrMessage()}
            <div className="submitButton">
                <button className="loginButton" onClick={handleLogin}> login </button>
            </div>

            <div className="submitButton">
                <button 
                    className="registerButton" 
                    onClick={() => setRegisterSelected(true)}
                >
                    register
                </button>
            </div>
        </>
    )


    return (
        <div className="app">
            {isLoggedIn 
             ? <MainPage/> // route to home page 
             : registerSelected
             ? <RegisterPage/> // route to register page
             : <>
               <h1 className = "title">Welcome to our page!</h1>
               <h2 className = "smallTitle">Sign In</h2>
                {renderForm}
               </>
             }
        </div>
    )
}