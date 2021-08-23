const OPEN = 'snakeReact/settingWindow/open';
const CLOSE = 'snakeReact/settingWindow/close';

const initialState = false;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN:
      return true;
    case CLOSE:
      return false;
    default:
      return state;
  }
}

export const toggleOpen = () => {
  return { type: OPEN };
};
export const toggleClose = () => {
  return { type: CLOSE };
};
