import { combineReducers } from 'redux';
import app from './app';
import infoReducer from './infoReducer';

const myStore = combineReducers({
    app,
    infoReducer
});

export default myStore;
