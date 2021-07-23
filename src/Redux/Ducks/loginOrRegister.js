const REGISTER = 'snakeReact/loginOrRegister/register';
const LOGIN = 'snakeReact/loginOrRegister/login';

const initialState = 'LOGIN';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return 'REGISTER';
    case LOGIN:
      return 'LOGIN';
    default:
      return state;
  }
}

export const toggleRegister = () => {
  return { type: REGISTER };
};
export const toggleLogin = () => {
  return { type: LOGIN };
};
