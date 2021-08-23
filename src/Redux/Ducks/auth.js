const SET_USER_DATA = 'snakeReact/auth/setUserData';
const LOGOUT = 'snakeReact/auth/logout';
const initialState = {
  loggedIn: false,
  userData: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        loggedIn: true,
        userData: action.payload,
      };
    case LOGOUT:
      return {
        loggedIn: false,
        userData: {},
      };
    default:
      return state;
  }
}

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
