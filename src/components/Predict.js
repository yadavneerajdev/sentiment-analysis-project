import React, { useState } from 'react';

function App() {
    const [prediction, setPrediction] = useState('');
    const [text, setText] = useState("");

    const handlePrediction = async () => {
        const url = 'http://localhost:5000/predict';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        const prediction = data.prediction;
        setPrediction(prediction);
    };

    return (
        <div>
            <input type="text" onChange={e => setText(e.target.value)} style={{ padding: "0.4em", fontSize: "16px" }} />
            <button onClick={handlePrediction} style={{ padding: "0.4em", fontSize: "16px" }}>Get Prediction</button>
            {prediction && <p style={{ marginTop: "1em" }}>Prediction : {prediction}</p>}
        </div>
    );
}

export default App;
