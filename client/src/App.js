import React from 'react';
import Time from './components/time'
import Feelings from './components/feelings/buttons'
import './App.css';

function App() {
  return (
    <div>
      <div className="title">
        <h1>Plan Me</h1>
      </div>
      <Feelings />
      <Time />
    </div>
  );
}

export default App;
