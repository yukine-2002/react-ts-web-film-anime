import { createStore , applyMiddleware } from "redux";
import logger from 'redux-logger'
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import { persistStore } from 'redux-persist';

const middlewares = [logger,thunk]

const store = createStore(rootReducer,applyMiddleware(...middlewares))
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch
export default store

