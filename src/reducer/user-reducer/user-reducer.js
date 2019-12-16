import {convertAuthApiToApp} from '../../utils';
import {SUCCESS_CODE, ActionType} from "../../constants";

const initialState = {
  isAuthorizationRequired: true,
  user: null,
};

const UserActionCreator = {
  requireAuthorization: (flag) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: flag,
  }),
  saveUser: (userData) => ({
    type: ActionType.SAVE_USER,
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
        } else {
          dispatch(UserActionCreator.requireAuthorization(true));
          dispatch(UserActionCreator.saveUser(null));
        }
      });
  },
  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((response) => {
          if (response && (response.status === SUCCESS_CODE)) {
            dispatch(UserActionCreator.requireAuthorization(false));
            dispatch(UserActionCreator.saveUser(response.data));
          } else {
            dispatch(UserActionCreator.requireAuthorization(true));
            dispatch(UserActionCreator.saveUser(null));
          }
        });
    };
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case ActionType.SAVE_USER:
      return Object.assign({}, state, {
        user: action.payload ? convertAuthApiToApp(action.payload) : null,
      });
  }

  return state;
};

export {UserActionCreator, UserOperation, userReducer};
