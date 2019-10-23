import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import myStore from './reducers/index';
import './assets/index.css';
import Login from './containers/user/login';
import Register from './containers/user/register';

const store = createStore(myStore, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" exact component={App} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
