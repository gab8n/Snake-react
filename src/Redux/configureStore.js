import { createStore, combineReducers } from 'redux';
import loginOrRegister from './Ducks/loginOrRegister';
import avatarMessage from './Ducks/avatarMessage';
import volumeManager from './Ducks/volumeManager';
import backgroundMusic from './Ducks/backgroundMusic';
import gameDifficulty from './Ducks/gameDifficulty';
import snakeDirection from './Ducks/snakeDirection';

const reducer = combineReducers({
  loginOrRegister,
  avatarMessage,
  volumeManager,
  backgroundMusic,
  gameDifficulty,
  snakeDirection,
});

const configureStore = (initialState) =>
  createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default configureStore;
