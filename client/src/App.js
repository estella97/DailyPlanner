import React from 'react';
import Time from './components/time/time'
import Feelings from './components/feelings/feelings'
import Commute from './components/commute/commute';
import Plan from './components/plan/plan'
import RadiusMap from './components/map/map'
import { Layout } from 'antd';
import './App.css';

const { Header, Footer, Content } = Layout;


function App() {
  return (
<<<<<<< HEAD
    <div>
      <div className="title">
        <h1>Plan Me</h1>
      </div>
      <div className="center">
        <Time className="center" />
        <br></br>
        <Feelings className="center" />
=======
    <Layout>
      <Header>
        <h1 className="title">Plan Me</h1>
      </Header>
      <Content className="body">
        <Time />
        <Feelings />
>>>>>>> master
        <br></br>
        <Commute />
        <br></br>
        <Plan />
<<<<<<< HEAD
        <div className='center'>
          <RadiusMap />
        </div>
      </div>
    </div>
=======
        <RadiusMap />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
>>>>>>> master
  );
}

export default App;
