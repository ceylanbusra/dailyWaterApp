import {configureStore} from '@reduxjs/toolkit';
//import { AsyncStorage } from "react-native";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import DrinkWaterReducer from '../reducers/drinkWaterReducer';

import InfoReducer from '../reducers/infoReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['info'],
};
const rootReducer = combineReducers({
  water: DrinkWaterReducer,
  info: InfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
