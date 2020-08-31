import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from 'redux-thunk';
import reducer from '../modules/footballMatchesDataModule'

const initialState = {};
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store;