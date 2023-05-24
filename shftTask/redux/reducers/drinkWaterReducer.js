const INITIAL_STATE = {
  drink: null,
  intake: [],
};

const DrinkWaterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_INTAKE_SUCCESS':
      return {
        ...state,
        intake: action.payload,
      };
    default:
      return state;
  }
};

export default DrinkWaterReducer;
