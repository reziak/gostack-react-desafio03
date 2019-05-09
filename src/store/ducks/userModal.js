export const Types = {
  SHOW: 'modal/SHOW',
  HIDE: 'modal/HIDE',
};

const INITIAL_STATE = {
  visible: false,
  coordinates: null,
};

export default function userModal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW:
      return {
        visible: true,
        coordinates: action.payload.coordinates,
      };
    case Types.HIDE:
      return {
        visible: false,
        coordinates: null,
      };
    default:
      return state;
  }
}

export const Creators = {
  showModal: coordinates => ({
    type: Types.SHOW,
    payload: { coordinates },
  }),

  hideModal: () => ({
    type: Types.HIDE,
  }),
};
