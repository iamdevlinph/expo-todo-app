import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import thunk from "redux-thunk";

import todoSlice from "../module/todo/store/todo-slice";

export const reducer = combineReducers({
  todoSlice,
});

export type RootState = ReturnType<typeof reducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authSlice", "storeCategorySlice", "productSlice.categories"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
  devTools: true,
});
