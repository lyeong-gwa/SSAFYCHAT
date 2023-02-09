import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

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
    searchMentoring: (state, action: PayloadAction<[]>) => {
      console.log(action.payload);
      state.applyingMentorings = action.payload;
    }
  }
})

export const { searchMentoring, tempAddMentoring } = ApplyingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.applying

export default ApplyingSlice.reducer