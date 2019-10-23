import { combineReducers } from 'redux';
import app from './app';
import infoReducer from './infoReducer';
import loginReducer from './login';

const myStore = combineReducers({
    app,
    infoReducer,
    loginReducer
});

export default myStore;
