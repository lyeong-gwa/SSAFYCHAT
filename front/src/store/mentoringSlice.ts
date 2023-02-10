import { createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface ReservedInfo{
    date : string,
    name : string,
    cardinal : Number,
    email : string,
    job : string,
}

// Define a type for the slice state
interface ReservedState {
    reservedMentorings: Array<ReservedInfo>,
}

// Define the initial state using that type
const initialState: ReservedState = {
    reservedMentorings: []
}

export const MentoringSlice = createSlice({
  name: 'mentoring',
  initialState,
  reducers: {
    tempAddReserved: (state)=>{
      const reservedInfo: ReservedInfo = {
        date : "2020-02-12 09:19",
        name : "김겨울",
        cardinal : 7,
        email : "kku@sment.com",
        job : "백엔드",
      }
      state.reservedMentorings.push(reservedInfo);
    },
    getReservation: ()=>{
        
    },
  }
})

export const { tempAddReserved } = MentoringSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.mentoring

export default MentoringSlice.reducer