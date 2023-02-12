import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// ***************************************
// api 호출시 주의점
// 서버에서 사용하는 이름과 대응하는 각각의 변수명들
//     id: completeMentoringId,
//     color: string,
//     content: reviewContent,
//     attached: reviewSelected, 이거 boolean아니고 1이나 0으로 들어옴 조건문에세 주의
//     posX: reviewWidth, 
//     posY: reviewHeight,
// ***************************************
interface RollingInfo{
    id: number,
    color: string,
    content: string,
    attached: number,
    posX: number,
    posY: number,
}

// Define a type for the slice state
interface RollingState {
    rollings: Array<RollingInfo>,
}

interface AttachingInfo{
  id: number,
  posX: number,
  posY: number,
}

// Define the initial state using that type
const initialState: RollingState = {
    rollings: [      
      {
        id: 0,
        color: "sticky_red",
        content: "저는 0번입니다! 길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다!",
        attached: 1,
        posX: 10,
        posY: 10,
    },
    {
      id: 1,
      color: "sticky_red",
      content: "저는 !번입니다! 길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다!",
      attached: 0,
      posX: 10,
      posY: 10,
    },
    ],
}

export const RollingSlice = createSlice({
  name: 'rolling',
  initialState,
  reducers: {
    getRollings:(state)=>{
      
    },
    attachRolling:(state, action: PayloadAction<AttachingInfo>)=>{
      for(let i = 0; i < state.rollings.length; ++i){
        if(state.rollings[i].id === action.payload.id){
            state.rollings[i].attached = 1;
            state.rollings[i].posX = action.payload.posX;
            state.rollings[i].posY = action.payload.posY;
        }
      }
    },
    removeRolling:(state, action: PayloadAction<AttachingInfo>)=>{
      for(let i = 0; i < state.rollings.length; ++i){
        if(state.rollings[i].id === action.payload.id){
            state.rollings[i].attached = 0;
            state.rollings[i].posX = action.payload.posX;
            state.rollings[i].posY = action.payload.posY;
        }
      }
    }
  }
})

export const { attachRolling, removeRolling} = RollingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.rolling

export default RollingSlice.reducer