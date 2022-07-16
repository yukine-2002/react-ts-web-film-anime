import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
};

const rootReducer = combineReducers({
    auth : authReducer
})
export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>
