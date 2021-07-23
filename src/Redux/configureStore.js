import { createStore, applyMiddleware, combineReducers } from 'redux';
// import createLogger from 'redux-logger';
import logger from 'redux-logger';
import loginOrRegister from './Ducks/loginOrRegister';
import avatarMessage from './Ducks/avatarMessage';
import volumeManager from './Ducks/volumeManager';

// const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware(logger)(createStore); // apply logger to redux

const reducer = combineReducers({
  loginOrRegister,
  avatarMessage,
  volumeManager,
});

const configureStore = (initialState) =>
  createStoreWithMiddleware(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default configureStore;
