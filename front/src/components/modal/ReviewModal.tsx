import "../../styles/components/modal/review-modal.css"
import { useState } from "react";
import { setReview } from "../../api/review";

// *********************************
// 화상회의에 붙일 경우 버튼 클릭시 api 호출 부분
// 알맞게 수정하여 사용하여야 함
// *********************************

function ReviewModal(props : any){
    function closeModal() {
        props.closeModal();
    }

    let [rate,setRate] = useState(3);
    let [content,setContent] = useState('');
    console.log(content)
    return (
        <div className="review_modal" >
            <div className="review_modal_body" onClick={(e) => e.stopPropagation()}>
                <div className='review_modal_header'>
                    <div className='review_modal_header_text'>멘토링 리뷰</div>
                    <button id="review_modal_close_btn" >
                    ✖
                    </button>
                </div>
                    <div className="review_rating_container">
                        <div className="review_rating_star">
                            <span className="review_rating_star_shape" onClick={()=>{setRate(1)}}>★</span>
                            <span className="review_rating_star_shape" onClick={()=>{setRate(2)}}>{2 <= rate ? '★' : '☆'}</span>
                            <span className="review_rating_star_shape" onClick={()=>{setRate(3)}}>{3 <= rate ? '★' : '☆'}</span>
                            <span className="review_rating_star_shape" onClick={()=>{setRate(4)}}>{4 <= rate ? '★' : '☆'}</span>
                            <span className="review_rating_star_shape" onClick={()=>{setRate(5)}}>{5 <= rate ? '★' : '☆'}</span>
                        </div>
                    </div>
                <form className='review_modal_content'>
                    <textarea className='review_modal_textarea' placeholder='감사의 한마디를 전해보세요' onChange={(event)=>{
                        setContent(event.target.value);
                    }}>
                        
                    </textarea>
                    <div className='review_modal_submit_button_container'>                          
                        <div className='review_modal_submit_button' onClick={()=>{
                            if(content.length !== 0){
                                // 화상회의에 컴포넌트를 붙이게 되면 사용할 함수
                                setReview({
                                    // 멘토링 아이디 받아서 써야함
                                    completeMentoringId: 0,
                                    reviewContent:content,
                                    score:rate,
                                },
                                (success : any)=>{
                                        console.log(success);
                                        alert("소중한 리뷰 감사합니다.")                                        
                                        closeModal();
                                },
                                (fail : any)=>{
                                    console.log(fail);

                                }
                                )
                                // closeModal();
                            }
                            else{
                                alert("리뷰를 작성해주세요")
                            }
                        }}>제출</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReviewModal;