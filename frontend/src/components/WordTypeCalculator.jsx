import React, { useState } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const WordTypeCalculator = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    console.log(apiUrl)

    const calculateWordTypes = async () => {
        const response = await axios.post(apiUrl, { text },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        setResult(response.data);
    };

    return (
        <div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <button onClick={calculateWordTypes}>Calculate</button>
            <p>{result && JSON.stringify(result)}</p>
        </div>
    );
};

export default WordTypeCalculator;
