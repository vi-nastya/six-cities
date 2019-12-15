import {convertAuthApiToApp} from '../../utils';
import {SUCCESS_CODE} from "../../constants";

const initialState = {
  isAuthorizationRequired: true,
  user: null,
};

const UserActionCreator = {
  requireAuthorization: (flag) => ({
    type: `REQUIRE_AUTHORIZATION`,
    payload: flag,
  }),
  saveUser: (userData) => ({
    type: `SAVE_USER`,
    payload: userData,
  }),
};

const UserOperation = {
  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        if (response.status === SUCCESS_CODE) {
          dispatch(UserActionCreator.requireAuthorization(false));
          dispatch(UserActionCreator.saveUser(response.data));
        }
      });
  },
  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((response) => {
          if (response.status === SUCCESS_CODE) {
            dispatch(UserActionCreator.requireAuthorization(false));
            dispatch(UserActionCreator.saveUser(response.data));
          }
        }).catch(() => {
          dispatch(UserActionCreator.requireAuthorization(true));
          dispatch(UserActionCreator.saveUser(null));
        });
    };
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `REQUIRE_AUTHORIZATION`:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case `SAVE_USER`:
      return Object.assign({}, state, {
        user: convertAuthApiToApp(action.payload),
      });
  }

  return state;
};

export {UserActionCreator, UserOperation, userReducer};
