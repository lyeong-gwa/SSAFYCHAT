import { createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit'
import type { RootState } from './store'


interface AppliedInfo{
    applyMentoringId: number,
    menteeUid: number,
    job: string,
    company: string,
    times:Array<string>,
}

interface ReservedInfo{
    date : string,
    name : string,
    cardinal : Number,
    email : string,
    job : string,
}

interface CanceledInfo{
    cancelMentoringId : number,
    job: string,
    company: string,
    time: string
}

// Define a type for the slice state
interface ReservedState {
    reservedMentorings: Array<ReservedInfo>,
    appliedMentorings: Array<AppliedInfo>,
    canceledInfo: Array<CanceledInfo>,
}

// Define the initial state using that type
const initialState: ReservedState = {
    reservedMentorings: [
      {
        date : "2023-21-31 AM 09:30",
        name : "임시데이터",
        cardinal : 7,
        email : "api로하고삭제",
        job : "제거할것",
      }
    ],
    appliedMentorings:[

    ],
    canceledInfo:[

    ],
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