import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import mainReducers from './pages/main/reducers/reducers';
// import feedbackReducers from './pages/feedback/reducers/reducers'
import reducers from './combineReducers'
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
