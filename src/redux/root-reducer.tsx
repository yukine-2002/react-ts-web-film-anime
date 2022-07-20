import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import postReducer from "./posts/posts.reducer";
import collectionReducer from "./collection/collection.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
};

const rootReducer = combineReducers({
    auth : authReducer,
    posts : postReducer,
    collection : collectionReducer
})
export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>
