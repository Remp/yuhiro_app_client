import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";
import rootReducer from "./reducers";
import apiMiddleware from "./middlewares/api";

export const generateStore = () => {
  const middlewares = [apiMiddleware];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
