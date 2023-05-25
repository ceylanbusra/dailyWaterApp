const INITIAL_STATE = {
  drink: null,
  intakeList: [],
  instake: {},
  goal: [],
};

const DrinkWaterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_INTAKE_SUCCESS':
      return {
        ...state,
        intake: action.payload,
      };
    case 'GET_INTAKE_LIST_UCCESS':
      return {
        ...state,
        intakeList: action.payload,
      };
    case 'GET_GOAL_SUCCESS':
      return {
        ...state,
        goal: action.payload,
      };
    default:
      return state;
  }
};

export default DrinkWaterReducer;
