import { combineReducers } from 'redux';
import app from './app';
import infoReducer from './infoReducer';
import loginReducer from './login';
import dashboard from './dashboard';

const myStore = combineReducers({
    app,
    infoReducer,
    loginReducer,
    dashboard
});

export default myStore;
