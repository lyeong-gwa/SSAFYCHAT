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

interface ReviewInfo{
  completeMentoringId: number,
  reviewContent: string,
  reviewHeight: number,
  reviewSelected: number,
  reviewWidth: number,
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

    ],
}

export const RollingSlice = createSlice({
  name: 'rolling',
  initialState,
  reducers: {
    getRollings:(state, action: PayloadAction<Array<ReviewInfo>>)=>{
    //   id: number,
    // color: string,
    // content: string,
    // attached: number,
    // posX: number,
    // posY: number,
        let tmpList = [];
        const colorClassList =["sticky_purple","sticky_green","sticky_red","sticky_yellow","sticky_blue"];
        for(let i = 0; i < action.payload.length; i++){
          tmpList.push(
            {
              id:action.payload[i].completeMentoringId, 
              color:colorClassList[i%4], 
              content:action.payload[i].reviewContent, 
              attached: action.payload[i].reviewSelected,
              posX: action.payload[i].reviewWidth,
              posY: action.payload[i].reviewHeight,
            })
        }
        state.rollings = tmpList;
    },
    attachRolling:(state, action: PayloadAction<AttachingInfo>)=>{
      for(let i = 0; i < state.rollings.length; i++){
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

export const { attachRolling, removeRolling, getRollings} = RollingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.rolling

export default RollingSlice.reducer