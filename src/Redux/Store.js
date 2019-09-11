import { combineReducers, createStore } from 'redux';
import LoginReducer from './Login/LoginReducer';
const todoApp = combineReducers({
    LoginReducer,
})
const store = createStore(todoApp);

export default store;