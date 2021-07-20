const REGISTERPAGE = 'snakeReact/avatarMessage/registerpage';
const LOGINPAGE = 'snakeReact/avatarMessage/loginpage';
const MENUPAGE = 'snakeReact/avatarMessage/menupage';
const GAMEPAGE = 'snakeReact/avatarMessage/gamepage';
const AUTHERROR = 'snakeReact/avatarMessage/autherror';
const USERNAMEFOCUS = 'snakeReact/avatarMessage/usernamefocus';
const EMAILFOCUS = 'snakeReact/avatarMessage/emailfocus';
const PASSWORDFOCUS = 'snakeReact/avatarMessage/passwordfocus';

const initialState = '';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTERPAGE:
      return 'New in the adventure?';
    case LOGINPAGE:
      return 'Happy to see you again!';
    case MENUPAGE:
      return 'You can LogIn, You know?';
    case GAMEPAGE:
      return "Let's start the game!";
    case USERNAMEFOCUS:
      return 'Pick something cool!';
    case EMAILFOCUS:
      return 'Without counterfit Emails pls :)';
    case PASSWORDFOCUS:
      return 'A password you will not remember!';
    default:
      return state;
  }
}

export const writeRegisterPageMessage = () => {
  return { type: REGISTERPAGE };
};
export const writeLoginPageMessage = () => {
  return { type: LOGINPAGE };
};
export const writeMenuPageMessage = () => {
  return { type: MENUPAGE };
};
export const writeGamePageMessage = () => {
  return { type: GAMEPAGE };
};
export const writeOnUsernameFocusMessage = () => {
  return { type: USERNAMEFOCUS };
};
export const writeOnEmailFocusMessage = () => {
  return { type: EMAILFOCUS };
};
export const writeOnPasswordFocusMessage = () => {
  return { type: PASSWORDFOCUS };
};
