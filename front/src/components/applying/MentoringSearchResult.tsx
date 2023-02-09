import '../../styles/components/applying/mentoring-search-result.css'
import ApplyingCard from '../../widget/ApplyingCard'
import ApplyingModal from '../modal/ApplyingModal';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { selectMentoring } from '../../store/applyingSlice';

function MentoringSearchResult (){
    const mentorings = useAppSelector(state => state.applying.searchedMentorings);
    const dispatch = useAppDispatch();
    
    // 카드리스트
    const cards = [];
    //카드 컴포넌트를 데이터 개수 만큼 리스트에 삽입
    for (let i = 0; i < mentorings.length; i++) {
        cards.push(
            <div key={i} className='result_component_card' onClick={()=> {setClickCard(!clickCard);dispatch(selectMentoring(mentorings[i]));}}>
                <ApplyingCard mentoring={mentorings[i]}></ApplyingCard>
            </div>
        );
    }

    //모달 on/off 변수 선언
    const[clickCard, setClickCard] = useState(false);

    return(
        <div className='result_component'>
            {cards}
            {clickCard && (
                <ApplyingModal closeModal={()=> setClickCard(!clickCard)}></ApplyingModal>
            )}
        </div>
    )
}

export default MentoringSearchResult