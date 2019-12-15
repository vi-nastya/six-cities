import {userReducer, UserOperation} from "./user-reducer";
import {ActionType} from "../../constants";
import {MOCK_USER, MOCK_USER_SERVER} from "../../mocks";
import {createAPI} from "../../api";
import MockAdapter from "axios-mock-adapter";

const initialStoreState = {
  isAuthorizationRequired: true,
  user: null,
};

describe(`User reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(userReducer(undefined, {})).toEqual(initialStoreState);
  });
  it(`Reducer correctly updates user data`, () => {
    expect(userReducer(initialStoreState, {
      type: ActionType.SAVE_USER,
      payload: MOCK_USER_SERVER
    })).toEqual({
      isAuthorizationRequired: true,
      user: MOCK_USER
    });
  });
  it(`Reducer correctly updates auth flag`, () => {
    expect(userReducer(initialStoreState, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: false
    })).toEqual({
      isAuthorizationRequired: false,
      user: null
    });
  });
});

describe(`API calls work correctly`, () => {
  it(`Should make a correct API call to /offers`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loginCaller = UserOperation.login();

    apiMock
      .onPost(`/login`)
      .reply(200, MOCK_USER_SERVER);

    return loginCaller(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SAVE_USER,
          payload: MOCK_USER_SERVER,
        });
      });
  });
});
