import '../../styles/components/applying/mentoring-search-result.css'
import ApplyingCard from '../../widget/ApplyingCard'
import { useState } from 'react';


function MentoringSearchResult (){
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

    const cards = [];

    for (let i = 0; i < count; i++) {
        cards.push(
            <div key={i} className='result_component_card'>
                <ApplyingCard mentoring={mentorings.item[i]}></ApplyingCard>
            </div>
        );
        
    }
    return(
        <div className='result_component'>
            {cards}
        </div>
    )
}

export default MentoringSearchResult