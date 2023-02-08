import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {search} from '../api/applying'

// Define a type for the slice state
interface MentoringState {
  Mentorings: {},
}

// Define the initial state using that type
const initialState: MentoringState = {
  Mentorings: []
}

export const MentoringSlice = createSlice({
  name: 'applying',
  initialState,
  reducers: {
    searchMentoring: (state, action: PayloadAction<{}>) => {
      console.log(action.payload);
      search(
        action.payload,
        (data:any)=>{console.log(data);},
        (err:any)=>{console.log(err);}
      );
    }
  }
})

export const { searchMentoring } = MentoringSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default MentoringSlice.reducer