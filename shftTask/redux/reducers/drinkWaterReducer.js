const INITIAL_STATE = {
  drink: null,
  intakeList: [],
  dailyIntake: [],
  goal: [],
  intake: [],
  deleteWater: [],
  setWater: [],
  dailyWaterList: [],
};

const DrinkWaterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_INTAKE_SUCCESS':
      return {
        ...state,
        intake: action.payload,
      };
    case 'GET_INTAKE_LIST_SUCCESS':
      return {
        ...state,
        intakeList: action.payload.reverse(),
      };
    case 'GET_GOAL_SUCCESS':
      return {
        ...state,
        goal: action.payload,
      };

    case 'DELETE_INTAKE_SUCCESS':
      return {
        ...state,
        deleteWater: action.payload,
      };

    case 'SET_INTAKE_LIST_SUCCESS':
      return {
        ...state,
        setWater: action.payload,
      };
    default:
      return state;
  }
};

export default DrinkWaterReducer;
