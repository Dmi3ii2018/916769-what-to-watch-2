import axios from 'axios';
import {ActionCreator} from "../reducer/root-reducer";
import {Redirect} from "react-router-dom";
import React from 'react';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 401) {
      dispatch(ActionCreator.requireAuthorization(true));
      return <Redirect to="/login" />;
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;

};
