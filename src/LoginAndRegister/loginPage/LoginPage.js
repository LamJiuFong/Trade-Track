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
    const handleLogin = async (event) => {
        event.preventDefault();
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
        <form className="login-form-container" onSubmit={handleLogin}>
            <h2 className = "login-form-title">Sign In</h2>
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
            <div className="forgot-password" onClick={handleForgotPassword}>
                    Forgot Password?
            </div>
            {renderErrMessage()}
            <div className="login-button-container">
                <button className="login-button" onClick={handleLogin}> Login </button>
            </div>

            <div className="sign-up-container">
                <div className="sign-up-label">
                    Do not have an account?
                </div>
                <div className="sign-up" onClick={() => setRegisterSelected(true)}>
                    Register
                </div>

            </div>
        </form>
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
                <span> </span>
            </h1>
        </div>
    );

    const renderLoginPage = (
        <div className="login-page">
            <>{renderForm}</>
            <>{renderTitle}</>
        </div>
    );

    

    return (
        <div>
            {isLoggedIn 
             ? <MainPage/> // route to home page 
             : registerSelected
             ? <RegisterPage/> // route to register page
             : <>{renderLoginPage}</>
             }
        </div>
    )
}