import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {search} from '../api/applying'

interface MentoringInfo{
  belong:string,
  job:string,
}

// Define a type for the slice state
interface ApplyingState {
  applyingMentorings: Array<MentoringInfo>,
}

// Define the initial state using that type
const initialState: ApplyingState = {
  applyingMentorings: []
}

export const ApplyingSlice = createSlice({
  name: 'applying',
  initialState,
  reducers: {
    tempAddMentoring: (state)=>{
      const mentoringInfo:MentoringInfo = {
        belong : "삼성전자",
        job : "프론트 개발자"
      }
      state.applyingMentorings.push(mentoringInfo);
    },
    searchMentoring: (state, action: PayloadAction<{}>) => {
      console.log(action.payload);
      search(
        action.payload,
        (data:any)=>{
          console.log(state.applyingMentorings);
          state.applyingMentorings = data.data;
        },
        (err:any)=>{console.log(err);}
      );
    }
  }
})

export const { searchMentoring, tempAddMentoring } = ApplyingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.applying.applyingMentorings

export default ApplyingSlice.reducer