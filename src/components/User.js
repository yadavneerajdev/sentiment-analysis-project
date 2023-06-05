import React from 'react'
import "./User.css"
import { useState } from 'react';

const UserSection = () => {

    const [data, setData] = useState([]);
    const [predicted, setPredicted] = useState([{}])
    const [loading, setLoading] = useState(false);


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const contents = e.target.result;
            let parsedData = [];

            if (file.type === 'text/csv') {
                parsedData = parseCSV(contents);
            } else if (file.type === 'application/json') {
                parsedData = JSON.parse(contents);
            }

            setData(parsedData);
        };

        reader.readAsText(file);
    };

    const parseCSV = (contents) => {
        const lines = contents.split('\n');
        const headers = lines[0].split(',');

        return lines.slice(1).map((line) => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index];
                return obj;
            }, {});
        });
    };

    const subFun = async (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(data)
        const url = 'http://localhost:5000/predict';
        let pre = [];

        for (let i = 0; i <= 100; i++) {
            // console.log(data[i].Review)

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: data[i].Review }),
            });

            const data1 = await response.json();
            const prediction = data1.prediction;

            console.log(prediction + "  :--:  " + data[i].Review)

            pre.push({ prediction: prediction, Text: data[i].Review })
            if (i === 100) {
                setPredicted(pre)
                setLoading(false)
            }
        }

    }

    return (
        <div className='user-wrapper'>
            <form onSubmit={(e) => subFun(e)}>
                <h3>Upload a csv/json file</h3>
                <input type="file" accept=".csv,.json" onChange={handleFileUpload} />
                <button>Submit</button>
            </form>
            <div className='card-wrapper'>
                {loading && <p className='load'>Woking on data please wait... <span className='spinner'>@</span></p>}
                {predicted ? predicted.map((elem, i) => {
                    return (
                        <div key={i} className='card'>
                            <h4>{elem.Text}</h4>
                            <p style={{ color: (elem.prediction === 'Positive') ? "green" : "red" }}>{elem.prediction}</p>
                        </div>
                    )
                }) : <></>}
            </div>

        </div>
    )
}

export default UserSection