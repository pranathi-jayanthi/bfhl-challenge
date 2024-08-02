import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('http://localhost:3000/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;
    
    return selectedOptions.map(option => {
      if (option.value === 'numbers') {
        return <p key="numbers">Numbers: {response.numbers.join(', ')}</p>;
      }
      if (option.value === 'alphabets') {
        return <p key="alphabets">Alphabets: {response.alphabets.join(', ')}</p>;
      }
      if (option.value === 'highest_alphabet') {
        return <p key="highest_alphabet">Highest Alphabet: {response.highest_alphabet[0]}</p>;
      }
      return null;
    });
  };

  return (
    <div className="App">
      <h1>BFHL API Tester</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON data, e.g. {"data": ["M","1","334","4","B"]}'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select filters"
          />
          <div className="response">
            <h2>Filtered Response:</h2>
            {renderFilteredResponse()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
