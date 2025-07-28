import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // This state variable will hold the message from our API
  const [apiMessage, setApiMessage] = useState('')

  // This useEffect hook runs our code once when the component loads
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/greeting')
      .then(response => response.json())
      .then(data => {
        // We take the message from the API and set it as our state
        setApiMessage(data.message);
      })
      .catch(error => {
        console.error('Error connecting to API:', error);
        setApiMessage('Could not connect to the backend API.');
      });
  }, []); // The empty [] means this code only runs one time.

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React E-Library</h1>
      <div className="card">
        <p>
          <strong>API Status:</strong> {apiMessage || 'Connecting...'}
        </p>
      </div>
    </>
  )
}

export default App