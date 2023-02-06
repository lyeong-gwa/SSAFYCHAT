import '../../styles/components/modal/applying-modal.css';

function ApplyingModal (props:any){

    function closeModal() {
        props.closeModal();
    }

    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal_body" onClick={(e) => e.stopPropagation()}>
                <div className='modal_header'>
                    <button id="modal_close_btn" onClick={closeModal}>
                    ✖
                    </button>
                </div>
                <div className='modal_content'>
                    <div className='modal_content_calendar_box'>
                        <div className='modal_content_calendar'></div>
                    </div>
                    <div className='modal_content_select'>
                        <div className='modal_content_selected_date'>
                            <div className='modal_content_time_btn_clicked'>
                                <div className='modal_content_time_text'>오전</div>
                            </div>
                            <div className='modal_content_time_btn'>
                                <div className="modal_content_time_text">오후</div>
                            </div>
                            <div className='modal_content_day'>10</div>
                            <div className='modal_content_month_year'>May</div>
                            <div className='modal_content_month_year'>2023</div>
                        </div>
                        <div className='modal_content_selected_time'></div>
                        <div className='modal_content_selected_times'></div>
                        <div className='modal_content_selected_belong_job'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyingModal