// src/reducers/userReducer.js
import {
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: localStorage.getItem("user"),
  message: null,
};

const userReducer = (state = initialState, action) => {
  // Named export
  const { type, payload } = action;

  switch (type) {
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));

      return {
        ...state,
        ...payload,
        user: payload.user,
        message: payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        message: payload,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
