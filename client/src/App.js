import React from 'react';
import Time from './components/time/time'
import Feelings from './components/feelings/feelings'
import Commute from './components/commute/commute';
import Plan from './components/plan/plan'
import RadiusMap from './components/map/map'
import './App.css';

function App() {
  return (
    <div>
      <div className="title">
        <h1>Plan Me</h1>
      </div>
      <div className="center">
        <Time className="center" />
        <br></br>
        <Feelings className="center" />
        <br></br>
        <Commute />
        <br></br>
        <Plan />
        <div className='center'>
          <RadiusMap />
        </div>
      </div>
    </div>
  );
}

export default App;
