import React from 'react';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
import { history } from './pages/nav/history';
import './App.css';

// Router & Web Content Definition
function App() {
  return (
    <Router history={history}>
      <Layout>
        <Header>
          <Link to="/"><h1 className="title">Plan Me</h1></Link>
        </Header>
      </Layout>
      <div>
        <Route exact path="/" component={Main} />
        <Route path="/results" component={ResultPage} />
        <Route path="/feedback" component={FeedbackPage} />
      </div>
      <Footer>
        <div>
          <Link to="/feedback">Give us feedback!</Link>
        </div>
      </Footer>
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
import Result from './pages/result/result';
function ResultPage() {
  return (
    <Content className="body">
      <Result />
    </Content>
  )
}

// Feedback Page Definition
import Feedback from './pages/feedback/Feedback';
function FeedbackPage() {
  return (
    <Layout>
      <Content>
        <Feedback />
      </Content>
    </Layout>
  )
}

export default App;
