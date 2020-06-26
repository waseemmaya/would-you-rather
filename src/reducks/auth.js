// import * as _API from "../utils/_DATA";

// action types
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

//  effect/thunk
export const login_user = (user) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: { authUser: user },
  });
};

export const logout_user = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
    payload: { authUser: null },
  });
};

// reducer
const defaultState = {
  //   authUser: "sarahedo",
  authUser: null,
};
function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };
    case LOGOUT_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default authReducer;

// const delay = (time) => new Promise((res) => setTimeout(res, time));
