import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [numberID, setNumberID] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5500/numbers/${numberID}`);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator Microservice</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numberID">Enter number ID (p, f, e, r):</label>
        <input
          type="text"
          id="numberID"
          name="numberID"
          value={numberID}
          onChange={(e) => setNumberID(e.target.value.trim())}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div id="response">
          {response.error ? (
            <p>{response.error}</p>
          ) : (
            <>
              <p>Previous window state: [{response.windowPrevstate.join(', ')}]</p>
              <p>Current window state: [{response.windowCurrstate.join(', ')}]</p>
              <p>Numbers received from server: [{response.numbers.join(', ')}]</p>
              <p>Average: {response.avg ? parseFloat(response.avg).toFixed(2) : 'N/A'}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
