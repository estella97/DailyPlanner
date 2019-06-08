import React from 'react';
import './App.css'
import Time from './components/time'
import Feelings from './components/feelings/buttons'
import Commute from './components/commute/commute';

function App() {
  return (
    <div className="center">
      <Time />
      <Feelings />
      <Commute />
    </div>
  );
}

export default App;
