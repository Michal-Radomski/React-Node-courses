import axios from "axios";

import { AUTH_ERROR, AUTH_USER } from "./types";

export const signup =
  (formProps: { email: string; password: string }, callback: () => void) => async (dispatch: Dispatch) => {
    // console.log("dispatch:", dispatch);
    // console.log("callback:", callback);
    try {
      const response = await axios.post("http://localhost:5000/api/signup", formProps);
      // console.log({response});
      const token = response?.data?.token;
      // console.log({ token });
      await dispatch({ type: AUTH_USER, payload: token });
      localStorage.setItem("token", token);
      callback();
    } catch (error) {
      console.log({ error });
      dispatch({ type: AUTH_ERROR, payload: "Email in use" });
    } finally {
      console.log("Job done!");
    }
  };

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: "",
  };
};

export const signin =
  (formProps: { email: string; password: string }, callback: () => void) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/signin", formProps);

      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      callback();
    } catch (error) {
      console.log({ error });
      dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
    } finally {
      console.log("Job done!");
    }
  };
