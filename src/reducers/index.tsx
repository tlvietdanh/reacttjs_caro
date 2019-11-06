import { combineReducers } from 'redux';
import app from './app';
import infoReducer from './infoReducer';
import loginReducer from './login';
import dashboard from './dashboard';
import io from './socket';

const myStore = combineReducers({
    app,
    infoReducer,
    loginReducer,
    dashboard,
    io
});

export default myStore;
