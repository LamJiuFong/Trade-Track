import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import MainPage from "../../MainPage/main.js";
import LoginPage from "../loginPage/LoginPage";
import { auth, userCollection } from "../../config/firebase-config";

import "./style.css";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterPage() {

    // states
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginSelected, setLoginSelected] = useState(false);

    // handlers
    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, pass).then(() => {
                // create an empty doc each time we register a new user
                setDoc(doc(userCollection, auth.currentUser.uid), {portfolioList: []});
            });
            setIsLoggedIn(true);
        } catch (err) {
            console.log(err.code);
            handleError(err.code);
        }
    }

    function handleError(code) {
        var errMsg = "error";
        if (code === 'auth/invalid-email') {
            errMsg = 'Invalid email';
            setEmail('');
            setPass('');
        } else if (code === 'auth/email-already-in-use') {
            errMsg = 'Email has already been registered, please proceed to login';
            setPass('');
        } else if (code === 'auth/weak-password') {
            errMsg = 'Password should be at least 6 characters';
            setPass('');
        } else if (code === 'auth/missing-password') {
            errMsg = 'Missing password';
        }

        toast.error(errMsg);
    }


    // render form ui
    const renderForm = (
        <form className="register-form-container" onSubmit={handleRegister}>
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


    const renderRegisterPage = (
        <div className="register-page">
            <>{renderForm}</>
            <>{renderTitle}</>
            <ToastContainer />
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