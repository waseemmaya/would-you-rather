import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import dataReducer from "./data";
import authReducer from "./auth";

const allReducers = combineReducers({
  data: dataReducer,
  auth: authReducer,
});

const middlewares = applyMiddleware(thunk);

const store = createStore(allReducers, middlewares);

export default store;
