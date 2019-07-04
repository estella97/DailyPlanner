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
    <Layout>
      <Header>
        <h1 className="title">Plan Me</h1>
      </Header>
      <Content className="body">
        <Time />
        <Feelings />
        <br></br>
        <Commute />
        <Plan />
        <RadiusMap />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
