// Initial State
const initialState = {
  status: null,
};

// Action Types
const SET_STATUS = "status/SET_STATUS";

// Action Creators
export const setStatus = (item) => ({
  type: SET_STATUS,
  payload: item,
});

// Reducer
const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default statusReducer;
