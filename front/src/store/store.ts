import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

import counterReducer from './counterSlice'
import applyingReducer from './applyingSlice'
import userReducer from './userSlice'
import mentoringReducer from './mentoringSlice'
import rollingReducer from './rollingSlice'

const reducers = combineReducers ({
  counter: counterReducer,
  applying: applyingReducer,
  user: userReducer,
  mentoring: mentoringReducer,
  rolling: rollingReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user'],
  blacklist: ['applying', 'mentoring', 'user'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store