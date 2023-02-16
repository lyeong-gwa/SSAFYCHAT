import '../../styles/components/modal/cancel-modal.css';
import { cancelMenteeMentoring } from '../../api/mentoring';
import { useState } from 'react';
function CancelModal (props:any){
    let [text,setText] = useState("");
    function closeModal() {
        props.closeModal();
    }
    let mId : number= props.info.mentoringId;
    return (
        <div className="cancel_modal" onClick={closeModal}>
            <div className="cancel_modal_body" onClick={(e) => e.stopPropagation()}>
                <div className='cancel_modal_header'>
                    <div className='cancel_modal_header_text'>멘토링 취소</div>
                    <button id="cancel_modal_close_btn" onClick={closeModal}>
                    ✖
                    </button>
                </div>
                <form className='cancel_modal_content'>
                    <textarea className='cancel_modal_textarea' placeholder='취소사유를 적어주세요' onChange={(event)=>{
                        setText(event.target.value);
                    }}>
                        
                    </textarea>
                    <div className='cancel_modal_submit_button_container'>                          
                        <div className='cancel_modal_submit_button' onClick={()=>{
                            cancelMenteeMentoring({mentoringId:mId,reason:text},(success : any)=>{
                                console.log(success);
                                closeModal();
                                
                            },(fail : any)=>{
                                console.log(fail);
                            })}
                        }>제출</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CancelModal;