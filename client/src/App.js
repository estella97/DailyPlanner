import React from 'react';
import Time from './components/time/time'
import Feelings from './components/feelings/buttons'
import './App.css';

function App() {
  return (
    <div>
      <div className="title">
        <h1>Plan Me</h1>
      </div>
      <div className="center">
        <Time />
        <Feelings />
      </div>
    </div>
  );
}

export default App;
