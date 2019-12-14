const SUCCESS_STATUS = 200;

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
        dispatch(UserActionCreator.requireAuthorization(false));
        dispatch(UserActionCreator.saveUser(response.data));
      });
  },
  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((response) => {
          if (response.status === SUCCESS_STATUS) {
            dispatch(UserActionCreator.requireAuthorization(false));
            dispatch(UserActionCreator.saveUser(response.data));
          }
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
        user: action.payload,
      });
  }

  return state;
};

export {UserActionCreator, UserOperation, userReducer};
