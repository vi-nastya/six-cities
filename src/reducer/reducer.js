import {combineReducers} from 'redux';

import {userReducer} from "./user-reducer/user-reducer";
import {dataReducer} from "./data-reducer/data-reducer";

const reducer = combineReducers({
  user: userReducer,
  data: dataReducer
});

export default reducer;
