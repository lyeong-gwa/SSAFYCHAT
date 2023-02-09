import '../../styles/components/modal/applying-modal.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../../styles/widget/calendar.css';
import { useAppSelector } from '../../hooks/hooks';
import { apply } from '../../api/applying';

function ApplyingModal (props:any){
    const mentoringInfo = useAppSelector(state=>state.applying.selectedMentoring);

    const [value, onChange] = useState(new Date());

    function numToName(month : number){
        switch(month){
            case 0: return 'Jan'; break;
            case 1: return 'Feb'; break;
            case 2: return 'Mar'; break;
            case 3: return 'Apr'; break;
            case 4: return 'May'; break;
            case 5: return 'Jun'; break;
            case 6: return 'Jul'; break;
            case 7: return 'Aug'; break;
            case 8: return 'Sep'; break;
            case 9: return 'Oct'; break;
            case 10: return 'Nov'; break;
            case 11: return 'Dec'; break;
            default: return 'Def'; 
        }
    }

    function closeModal() {
        props.closeModal();
    }
    
    function applyMentoring() {
        const applying = {
            "job" : mentoringInfo.belong,
            "company" : mentoringInfo.job,
            "times" : [value]
        }

        apply(
            applying,
            (data:any)=>{
                console.log(data);
            },
            (err:any)=>{console.log(err);}
          );
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
                        <div className='modal_content_calendar'>
                            <Calendar onChange={onChange} value={value} calendarType='US'></Calendar>
                        </div>
                    </div>
                    <div className='modal_content_select'>
                        <div className='modal_content_selected_date'>
                            <div className='modal_content_time_btn_clicked'>
                                <div className='modal_content_time_text' onClick={()=>console.log(value)
                                }>오전</div>
                            </div>
                            <div className='modal_content_time_btn'>
                                <div className="modal_content_time_text">오후</div>
                            </div>
                            <div className='modal_content_day'>{value.getDate()}</div>
                            <div className='modal_content_month_year'>{numToName(value.getMonth())}</div>
                            <div className='modal_content_month_year'>{value.getFullYear()}</div>
                        </div>
                        <div className='modal_content_select_box'>
                            <div className='modal_content_selected_time_am_pm'>
                                <div className='am_pm'>
                                    AM
                                </div>
                            </div>
                            <div className='modal_content_select_time'>
                                <div className='select_before'>
                                    <div className="select_before_icon"></div>
                                </div>
                                <div className='selected_time'>
                                    <div className='selected_time_hour'>11</div>
                                    <div className='time_cutting_colon'>:</div>
                                    <div className='selected_time_miniute'>30</div>
                                </div>
                                <div className='select_after'>
                                    <div className="select_after_icon"></div>
                                </div>
                                <div className='select_time_btn'>
                                    <div className='select_time_btn_text'>추가</div>
                                </div>
                            </div>
                        </div>
                        <div className='modal_content_selected_times'>
                            <div className="selected_time_item">
                                <div className='selected_time_item_text'>11 : 30</div>
                            </div>
                        </div>
                        <div className='modal_content_selected_belong_job_apply'>
                            <div className='modal_content_belong'>
                                <div className="modal_content_belong_text">{mentoringInfo.belong}</div> 
                            </div>
                            <div className='modal_content_job'>
                                <div className="modal_content_job_text">{mentoringInfo.job}</div>
                            </div>
                            <div className='modal_content_apply'>
                                <div className="modal_content_apply_btn">
                                    <div className="modal_content_apply_btn_text"  onClick={()=>{applyMentoring();}}>신청</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyingModal