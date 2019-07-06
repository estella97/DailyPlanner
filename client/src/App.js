import React from 'react';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
import { history } from './pages/nav/history';
import './App.css';

// Router & Web Content Definition
function App() {
  return (
    <Router history={history}>
      <Layout>
        <Header className="title">
          <h1>Plan Me</h1>
        </Header>
      </Layout>
      <div>
        <Route exact path="/" component={Main} />
        <Route path="/result" component={Result} />
      </div>
      <Footer>Footer</Footer>
    </Router>
  );
}

// Main Page Definition
import Time from './pages/main/components/time/time'
import Feelings from './pages/main/components/feelings/feelings'
import Commute from './pages/main/components/commute/commute';
import Plan from './pages/main/components/plan/plan'
import RadiusMap from './pages/main/components/map/map'
function Main() {
  return (
    <Content className="body">
      <Time />
      <Feelings />
      <br></br>
      <Commute />
      <br></br>
      <RadiusMap />
      <br></br>
      <Plan />
    </Content>
  );
}

// Result Page Definition
function Result() {
  return (
    <Content className="body">
      <h4>
        Hello
      </h4>
    </Content>
  )
}

export default App;
