import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import applyingReducer from './applyingSlice'
import userReducer from './userSlice'
import mentoringReducer from './mentoringSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    applying: applyingReducer,
    user: userReducer,
    mentoring: mentoringReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;