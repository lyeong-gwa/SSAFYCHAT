import '../../styles/components/modal/cancel-modal.css';

function CancelModal (props:any){

    function closeModal() {
        props.closeModal();
    }

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
                    <textarea className='cancel_modal_textarea' placeholder='취소사유를 적어주세요'>
                        
                    </textarea>
                    <div className='cancel_modal_submit_button_container'>                          
                        <div className='cancel_modal_submit_button' onClick={
                            closeModal
                        }>제출</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CancelModal;