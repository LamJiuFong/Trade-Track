import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { auth, userCollection } from "../../../../config/firebase-config";
import "./AddStockInput.css";
import symbolChecker from "../../../symbolChecker";
import {ToastContainer} from "react-toastify";


export default function AddStockInput({setStocks, setAddStocksVisibility}) {
    const defaultInputValue = {
        id : '',
        ticker: "",
        position: "BUY",
        quantity: 10,
        price: 50,
    };

    const [inputValues, setInputValues] = useState(defaultInputValue);
    const [canSubmit, setCanSubmit] = useState(false);

    //handle change of inputs
    const handleChange = (event) => {
        setInputValues((inputValues) => ({
            ...inputValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleNumberChange = (event) => {
        var input = event.target.value.replace(/\D/g, '');
        if (input === "") {
            input = "0";
        }

        const result = parseInt(input);

        setInputValues((inputValues) => ({
            ...inputValues,
            [event.target.name]: result,
        }));
    };

    function updateCanSubmit() {
        if (inputValues.ticker === "" || inputValues.quantity <= 0 || inputValues.price <= 0) {
            setCanSubmit(false);
        }

        if (inputValues.ticker !== "" && inputValues.quantity > 0 && inputValues.price > 0) {
            setCanSubmit(true);
        }
    }

    useEffect(() => {
        updateCanSubmit();
    }, [inputValues])

    //handle cancel
    const handleCancel = (event) => {
        setInputValues(defaultInputValue);
        setAddStocksVisibility(false);
    };

    //handle new stock additions
    const handleSubmit = async (event) => {

        //prevents default behavior of refreshing the page
        event.preventDefault(); 

        var isValid = await symbolChecker(inputValues.ticker);

        try {
            //validation of a correct input
            if (isValid && inputValues.price > 0 && inputValues.quantity > 0) {
                const newStock = {
                    id: uuidv4(),
                    ticker: inputValues.ticker,
                    position: inputValues.position,
                    quantity: inputValues.quantity,
                    price: inputValues.price,
                };

                // const response = fetch(`https://${DATABASE}.json`, {
                //     method: "POST",
                //     "Content-Type": "application/json",
                //     body: JSON.stringify(newStock),
                // });

                // const data = response.json();

                var userDoc = await getDoc(doc(userCollection, auth.currentUser.uid));

                const stocksArray = userDoc.data().stocks;

                const updatedStocksArray = [...stocksArray, newStock];

                setDoc(doc(userCollection, auth.currentUser.uid), {stocks: updatedStocksArray});

                userDoc = await getDoc(doc(userCollection, auth.currentUser.uid));
                const data = userDoc.data().stocks;

                if (data) {
                    setStocks(updatedStocksArray);
                    setInputValues(defaultInputValue);
                    setAddStocksVisibility(false);
                }
            } else {
                console.log("invalid symbol");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
    <div>
       <form className="add-stock-form-container">
            <div className="form-container">
                <div className="new-stock">
                    <input
                        type="text"
                        name="ticker"
                        value={inputValues.ticker}
                        onChange={handleChange}
                        placeholder="Input Stock Ticker"
                        className="new-stock-input"/>
                </div>

                <div className="new-stock">
                    <select
                        name="position"
                        onChange={handleChange}
                        value={inputValues.position}
                        className="new-stock-input"
                    >
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                    </select>
                </div>

                <div className="new-stock">
                    <input
                        type="text"
                        name="quantity"
                        onChange={handleNumberChange}
                        value={inputValues.quantity}
                        className="new-stock-input"
                    />
                </div>

                <div className="new-stock">
                    <input
                        type="text"
                        name="price"
                        onChange={handleNumberChange}
                        value={inputValues.price}
                        className="new-stock-input"
                    />
                </div>
            </div>
            
            <div className="add-cancel-buttons-container">
                <button 
                    className="add-cancel-button" 
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    >
                    <span>Add</span>
                </button>

                <button className="add-cancel-button" onClick={handleCancel}>
                    <span>Cancel</span>
                </button>
            </div>
       </form> 
       <ToastContainer/>
    </div>
    );
}