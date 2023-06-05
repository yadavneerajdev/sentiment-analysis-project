import React from 'react'
import { useState, useEffect } from 'react'
import Predict from "./components/Predict"
import User from "./components/User"
import "./App.css"

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(res => res.json()).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <div className='App'>
      <div className='App-header'>
        <Predict />
        <User />
      </div>
    </div>
  )
}

export default App