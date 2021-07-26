import backgroundMusicMenu from '../../Sounds/backgroundMusicMenu.mp3';
import backgroundMusicGame from '../../Sounds/backgroundMusicGame.mp3';
import backgroundMusicLogin from '../../Sounds/backgroundMusicLogin.mp3';

const MENU = 'snakeReact/backgroundMusic/menu';
const LOGIN = 'snakeReact/backgroundMusic/login';
const GAME = 'snakeReact/backgroundMusic/game';

const initialState = backgroundMusicMenu;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MENU:
      return backgroundMusicMenu;
    case LOGIN:
      return backgroundMusicLogin;
    case GAME:
      return backgroundMusicGame;
    default:
      return state;
  }
}

export const playBackgroundMusicMenu = () => {
  return { type: MENU };
};
export const playBackgroundMusicLogin = () => {
  return { type: LOGIN };
};
export const playBackgroundMusicGame = () => {
  return { type: GAME };
};
