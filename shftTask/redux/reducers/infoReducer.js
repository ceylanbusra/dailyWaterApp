const INITIAL_STATE = {
  info: true,
  weightStatus: null,
  femaleStatus: null,
  heightStatus: null,
};

const InfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INFO_SCREEN_STATUS':
      return {
        ...state,
        info: action.payload,
      };
    case 'INFO_SCREEN_FEMALE':
      return {
        ...state,
        femaleStatus: action.payload,
      };
    case 'INFO_SCREEN_WEIGHT':
      return {
        ...state,
        weightStatus: action.payload,
      };
    case 'INFO_SCREEN_HEIGHT':
      return {
        ...state,
        heightStatus: action.payload,
      };
    default:
      return state;
  }
};

export default InfoReducer;
