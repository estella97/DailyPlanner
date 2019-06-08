import React from 'react';
import './App.css'
import Time from './components/time'
import Feelings from './components/feelings/buttons'

function App() {
  return (
    <div className="center">
      <Time />
      <Feelings/>
    </div>
  );
}

export default App;
