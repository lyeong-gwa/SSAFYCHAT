import "../../styles/components/modal/applying-modal.css";
import Calendar from "react-calendar";
import { useState } from "react";
import "../../styles/widget/calendar.css";
import { useAppSelector } from "../../hooks/hooks";
import { apply } from "../../api/applying";

function ApplyingModal(props: any) {
  const mentoringInfo = useAppSelector(
    (state) => state.applying.selectedMentoring
  );

  const [beforeOrAfter, setBeforeOrAfter] = useState("AM");
  const [date, setDate] = useState(() => {
    const curTime = new Date();
    const curHour = curTime.getHours();
    if (curHour > 12) {
      curTime.setHours(curHour - 12);
      setBeforeOrAfter("PM");
    }
    return curTime;
  });
  const [selectedTimes, pushTime] = useState<Date[]>([]);
  const [times, pushTimeString] = useState<string[]>([]);
  const [hour, setHour] = useState(
    (date.getHours() < 10 ? "0" : "") + date.getHours()
  );
  const [minute, setMinute] = useState("00");

  /** 월별 숫자를 영어로 바꾸는 함수 */
  function numToName(month: number) {
    switch (month) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
      default:
        return "Def";
    }
  }

  /** 모달 닫는 함수 실행 시키는 함수 */
  function closeModal() {
    props.closeModal();
  }

  /** 위쪽 방향 버튼을 눌렀을 경우 30분씩 감소시키는 함수 */
  function upBtnClicked() {
    if (minute === "00") {
      setMinute("30");
      if (hour !== "01") {
        const intHour = parseInt(hour) - 1;
        setHour((intHour < 10 ? "0" : "") + intHour);
      } else {
        setHour("12");
        if (beforeOrAfter === "AM") {
          setBeforeOrAfter("PM");
        } else {
          setBeforeOrAfter("AM");
        }
      }
    } else if (minute === "30") {
      setMinute("00");
    }
  }

  /** 아래쪽 방향 버튼을 눌렀을 경우 30분씩 감소시키는 함수 */
  function downBtnClicked() {
    if (minute === "00") {
      setMinute("30");
    } else if (minute === "30") {
      setMinute("00");
      if (hour !== "12") {
        const intHour = parseInt(hour) + 1;
        setHour((intHour < 10 ? "0" : "") + intHour);
      } else {
        setHour("01");
        if (beforeOrAfter === "AM") {
          setBeforeOrAfter("PM");
        } else {
          setBeforeOrAfter("AM");
        }
      }
    }
  }

  /** 선택한 시간을 배열에 담는 함수 */
  function putTime() {
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
    /** Date 배열에 삽입 */
    pushTime([...selectedTimes, new Date(date)]);
  }

  /** 신청하는 api 호출*/
  function applyMentoring() {
    selectedTimes.map((time)=>{
      times.push(time.toISOString());
    });

    const applying = {
      job: mentoringInfo.job,
      company: mentoringInfo.belong,
      times: times,
    };

    apply(
      applying,
      (data: any) => {
        console.log(data);
        alert("신청되었습니다.");
        props.closeModal();
      },
      (err: any) => {
        console.log(err);
        alert("신청에 실패하였습니다.");
        props.closeModal();
      }
    );
  }

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal_body" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <button id="modal_close_btn" onClick={closeModal}>
            ✖
          </button>
        </div>
        <div className="modal_content">
          <div className="modal_content_calendar_box">
            <div className="modal_content_calendar">
              <Calendar
                onChange={setDate}
                value={date}
                calendarType="US"
              ></Calendar>
            </div>
          </div>
          <div className="modal_content_select">
            <div className="modal_content_selected_date">
              <div
                className={
                  beforeOrAfter === "AM"
                    ? "modal_content_time_btn_clicked"
                    : "modal_content_time_btn"
                }
              >
                <div
                  className="modal_content_time_text"
                  onClick={() => setBeforeOrAfter("AM")}
                >
                  오전
                </div>
              </div>
              <div
                className={
                  beforeOrAfter === "PM"
                    ? "modal_content_time_btn_clicked"
                    : "modal_content_time_btn"
                }
              >
                <div
                  className="modal_content_time_text"
                  onClick={() => setBeforeOrAfter("PM")}
                >
                  오후
                </div>
              </div>
              <div className="modal_content_day">{date.getDate()}</div>
              <div className="modal_content_month_year">
                {numToName(date.getMonth())}
              </div>
              <div className="modal_content_month_year">
                {date.getFullYear()}
              </div>
            </div>
            <div className="modal_content_select_box">
              <div className="modal_content_selected_time_am_pm">
                <div className="am_pm">{beforeOrAfter}</div>
              </div>
              <div className="modal_content_select_time">
                <div className="select_before">
                  <div
                    className="select_before_icon"
                    onClick={() => upBtnClicked()}
                  ></div>
                </div>
                <div className="selected_time">
                  <div className="selected_time_hour">{hour}</div>
                  <div className="time_cutting_colon">:</div>
                  <div className="selected_time_minute">{minute}</div>
                </div>
                <div className="select_after">
                  <div
                    className="select_after_icon"
                    onClick={() => downBtnClicked()}
                  ></div>
                </div>
                <div className="select_time_btn">
                  <div
                    className="select_time_btn_text"
                    onClick={async () => {
                      await putTime();
                    }}
                  >
                    추가
                  </div>
                </div>
              </div>
            </div>
            <div className="modal_content_selected_times">
              {selectedTimes.map((time) => {
                return (
                  <div className="selected_time_item">
                    <div className="selected_time_item_text">
                      {(time.getHours() < 10 ? "0" : "") + time.getHours()}:
                      {(time.getMinutes() < 10 ? "0" : "") + time.getMinutes()}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="modal_content_selected_belong_job_apply">
              <div
                className="modal_content_belong"
                onClick={() => {
                  console.log(selectedTimes);
                }}
              >
                <div className="modal_content_belong_text">
                  {mentoringInfo.belong}
                </div>
              </div>
              <div className="modal_content_job">
                <div className="modal_content_job_text">
                  {mentoringInfo.job}
                </div>
              </div>
              <div className="modal_content_apply">
                <div className="modal_content_apply_btn">
                  <div
                    className="modal_content_apply_btn_text"
                    onClick={() => {
                      applyMentoring();
                    }}
                  >
                    신청
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyingModal;
