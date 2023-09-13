import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/wordTypeCalculator.css";

const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const WordTypeCalculator = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculateWordTypes = async () => {
        if (!text.trim()) {
            toast.error("Please enter some text before calculating.");
            return;
        }
        setLoading(true);
        const response = await axios.post(apiUrl, { text },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        setResult(response.data);
        setLoading(false);
    };

    const formatResult = (result) => {
        const keys = ["noun", "verb", "adjective", "adverb", "preposition", "conjunction", "pronoun", "interjection", "determiner", "numeral"];
        return keys.map(key => `${key}: ${result[key] || 0}`).join('\n');
    };
    

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="header-container">
                <h1>Word Type Calculator</h1>
                <img src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif" alt="Cool Cat" />
            </div>

            <div className="word-calculator-container">
                <label htmlFor="inputText">Input Text:</label>
                <textarea
                    id="inputText"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rows="5"
                    cols="50"
                />

                <label htmlFor="resultText">Results:</label>
                <textarea
                    id="resultText"
                    value={result ? formatResult(result) : ''}
                    rows="15"
                    cols="50"
                    readOnly
                />

                <button
                    onClick={calculateWordTypes}
                    disabled={loading}
                >
                    Calculate
                </button>
            </div>
        </>
    );
};

export default WordTypeCalculator;
