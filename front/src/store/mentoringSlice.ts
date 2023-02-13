import { createSlice, PayloadAction, /*PayloadAction*/ } from '@reduxjs/toolkit'
import type { RootState } from './store'

// 멘티입장
interface AppliedInfo{
    applyMentoringId: number,
    menteeUid: number,
    job: string,
    company: string,
    times:Array<string>,
}

interface ReservedInfo{
    mentoringId: number,
    time : string,
    name : string,
    company : string,
    job : string,
    numberth: number,
}

interface CanceledInfo{
    cancelMentoringId : number,
    job: string,
    company: string,
    time: string
}

//멘토입장
interface applyInfo{
  applyMentoringId: number,
  name: string,
  studentNumber: string,
  numberth: number,
  email: string,
  times: Array<string>,
}

interface matchInfo{
  name:string,
  studentNumber:string,
  numberth:number,
  email:string,
  time:string,
  mentoringId:number,
}

interface AppointmentState{
  applys:Array<applyInfo>,
  matches:Array<matchInfo>,
}

// Define a type for the slice state
interface ReservationState {
    matchedList: Array<ReservedInfo>,
    appliedList: Array<AppliedInfo>,
    canceledList: Array<CanceledInfo>,
}

interface MentoringState{
  appointmentList:AppointmentState,
  reservationList:ReservationState,
  mentoringId:number,
}

// Define the initial state using that type
const initialState: MentoringState = {
    appointmentList:{
      applys:[],
      matches:[],
    },
    reservationList:{
      matchedList:[],
      appliedList:[],
      canceledList:[],
    },
    mentoringId: -1,
}

export const MentoringSlice = createSlice({
  name: 'mentoring',
  initialState,
  reducers: {
    getReservation: (state, action: PayloadAction<ReservationState>)=>{
        state.reservationList.appliedList = action.payload.appliedList;
        state.reservationList.canceledList = action.payload.canceledList;
        state.reservationList.matchedList = action.payload.matchedList;
    },
    getAppointment: (state, action: PayloadAction<AppointmentState>)=>{
        state.appointmentList.applys = action.payload.applys;
        state.appointmentList.matches = action.payload.matches;
    },
    setMentoringId:(state, action:PayloadAction<number>)=>{
      state.mentoringId = action.payload;
    }
  }
})

export const { getReservation, getAppointment, setMentoringId } = MentoringSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.mentoring

export default MentoringSlice.reducer