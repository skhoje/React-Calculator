import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const handleButtonPress = (value) => {
    if (value === '=') {
      evaluateExpression();
    } else if (value === 'Clear') {
      setInput('');
      setResult('');
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const evaluateExpression = () => {
    try {
      // eslint-disable-next-line
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleButtonClick = (value) => {
    handleButtonPress(value);
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === 'Enter') {
      if (key === 'Enter') {
        evaluateExpression();
      } else {
        handleButtonPress(key);
      }
    } else if (key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    }
  };

  const handleInputFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="calculator" tabIndex="0" onKeyDown={handleKeyPress}>
      <input
        ref={inputRef}
        type="text"
        className="input"
        value={input}
        placeholder="Enter an expression"
        readOnly
        onClick={handleInputFocus} // Ensure input field receives focus when clicked
      />
      <div className="buttons">
        <div className="row">
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button onClick={() => handleButtonClick('/')}>/</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button onClick={() => handleButtonClick('*')}>*</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button onClick={() => handleButtonClick('-')}>-</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('=')}>=</button>
          <button onClick={() => handleButtonClick('+')}>+</button>
          <button onClick={() => handleButtonClick('Clear')}>Clear</button>
        </div>
      </div>
      {result && <div className="result">Result: {result}</div>}
    </div>
  );
}

export default App;
