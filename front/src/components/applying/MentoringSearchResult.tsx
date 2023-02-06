import '../../styles/components/applying/mentoring-search-result.css'
import ApplyingCard from '../../widget/ApplyingCard'
import { useState } from 'react';
import ApplyingModal from '../modal/ApplyingModal';


function MentoringSearchResult (){
    // 더미 데이터 설정
    const [count] = useState(15);
    const [mentorings] = useState({
        item : [{
            belong : "카카오",
            job : "백엔드 개발자"
        },
        {
            belong : "라인",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        {
            belong : "카카오",
            job : "백엔드 개발자"
        },
        {
            belong : "라인",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        {
            belong : "카카오",
            job : "백엔드 개발자"
        },
        {
            belong : "라인",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        {
            belong : "삼성",
            job : "백엔드 개발자"
        },
        ]
    });
    // 카드리스트
    const cards = [];
    //카드 컴포넌트를 데이터 개수 만큼 리스트에 삽입
    for (let i = 0; i < count; i++) {
        cards.push(
            <div key={i} className='result_component_card' onClick={()=> setClickCard(!clickCard)}>
                <ApplyingCard mentoring={mentorings.item[i]}></ApplyingCard>
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