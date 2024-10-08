// src/actions/userActions.js
import axios from "axios";
import {
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "./types";

import config from "../config";

export const register = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await axios.post(
      // "http://localhost:5001/api/users/register",
      // "https://mental-health-user-management.onrender.com/api/users/register",
      `${config.backend}/api/users/register`,
      formData
    );
    console.log("test");
    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response.data });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      // "http://localhost:5001/api/users/login",
      // "https://mental-health-user-management.onrender.com/api/users/login",
      `${config.backend}/api/users/login`,
      formData
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data });
  }
};
