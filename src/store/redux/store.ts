import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "@/store/redux/reducers/rootReducer";
import rootSaga from "@/store/redux/sagas";

const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const middlewares = [sagaMiddleware];
if (process.env.REACT_APP_ENV === `development`) {
  const {logger} = require(`redux-logger`);
  middlewares.push(logger);
}

const composeEnhancers = (process.env.REACT_APP_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
);
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
