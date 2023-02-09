import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface MentoringInfo{
  belong:string,
  job:string,
}

// Define a type for the slice state
interface ApplyingState {
  searchedMentorings: Array<MentoringInfo>,
  selectedMentoring: MentoringInfo,
}

// Define the initial state using that type
const initialState: ApplyingState = {
  searchedMentorings: [],
  selectedMentoring: {
    belong : '',
    job : '',
  }
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
      state.searchedMentorings.push(mentoringInfo);
    },
    searchMentoring: (state, action: PayloadAction<[]>) => {
      state.searchedMentorings = action.payload;
    },
    selectMentoring: (state, action: PayloadAction<MentoringInfo>) => {
      state.selectedMentoring = action.payload;
      console.log(state.selectedMentoring);
    }
  }
})

export const { searchMentoring, selectMentoring, tempAddMentoring } = ApplyingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.applying

export default ApplyingSlice.reducer