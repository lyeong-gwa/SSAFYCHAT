import { createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface RollingInfo{
    id : number,
    color : string,
    content : string,
}

// Define a type for the slice state
interface RollingState {
    rollings: Array<RollingInfo>,
}

// Define the initial state using that type
const initialState: RollingState = {
    rollings: [
        {
            id: 0,
            color: "sticky_red",
            content: "길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다!"
        }
    ]
}

export const RollingSlice = createSlice({
  name: 'rolling',
  initialState,
  reducers: {
    tempAddRolling: (state)=>{
      const rollingInfo: RollingInfo = {
        id: Math.floor(Math.random()*100000),
        color: "sticky_red",
        content: "길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다!"
      }
      state.rollings.push(rollingInfo);
    },
  }
})

export const { tempAddRolling } = RollingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.mentoring

export default RollingSlice.reducer