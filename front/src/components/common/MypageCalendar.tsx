import Calendar from 'react-calendar';
import { useState } from 'react';
import '../../styles/components/common/mypage-calendar.css'

function MyPageCalendar() {

  const [value, onChange] = useState(new Date());

  return (
  <div className="calendar_component">
    <Calendar onChange={onChange} value={value} calendarType='US'></Calendar>
  </div>);
  
  }


export default MyPageCalendar;
