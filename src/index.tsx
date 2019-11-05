import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import myStore from './reducers/index';
import './assets/css/index.css';
import Login from './containers/user/login';
import Dashboard from './containers/DashBoard';
import './assets/css/App.css';

const store = createStore(myStore, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/login" exact component={Login} />
                <Route path="/game" exact component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// run saga:

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
