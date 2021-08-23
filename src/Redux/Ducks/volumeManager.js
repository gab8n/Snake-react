const EFFECTSVOLUME = 'snakeReact/volumeManager/effectsvolume';
const MUSICVOLUME = 'snakeReact/volumeManager/musicvolume';

const initialState = { musicVolume: 5, effectsVolume: 5 };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EFFECTSVOLUME:
      return {
        ...state,
        effectsVolume: action.payload,
      };

    case MUSICVOLUME:
      return {
        ...state,
        musicVolume: action.payload,
      };
    default:
      return state;
  }
}

export const changeEffectsVolume = (volume) => {
  return { type: EFFECTSVOLUME, payload: volume };
};

export const changeMusicVolume = (volume) => {
  return { type: MUSICVOLUME, payload: volume };
};
