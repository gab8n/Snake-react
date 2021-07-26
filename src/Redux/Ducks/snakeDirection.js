const DIRECTION = 'snakeReact/snakeDirection/direction';

const initialState = 'RIGHT';
const checkValidDirection = (actualDirection, nextDirection) => {
  if (
    (actualDirection === 'RIGHT' && nextDirection === 'LEFT') ||
    (actualDirection === 'LEFT' && nextDirection === 'RIGHT') ||
    (actualDirection === 'UP' && nextDirection === 'DOWN') ||
    (actualDirection === 'DOWN' && nextDirection === 'UP')
  )
    return actualDirection;
  else return nextDirection;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DIRECTION:
      return checkValidDirection(state, action.payload);
    default:
      return state;
  }
}

export const changeDirection = (direction) => {
  return { type: DIRECTION, payload: direction };
};
