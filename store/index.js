import { compose, applyMiddleware } from 'redux';
import {legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from '../reducers';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['likedJobs']
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(),
      persistedReducer,
  )
);

persistStore(store);

export default store;
