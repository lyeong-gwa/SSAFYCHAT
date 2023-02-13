import "../../styles/components/common/mentoring-list.css";

function MentoringList(props: any) {
  function dateToString(mentoringdate: String){
    const date = new Date(mentoringdate);
    const formattedTime = date.toLocaleString("ko-KR", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric",});
    return formattedTime;
  }
  return (
    <div className="mentoring_list_component">
      {/* <span>{JSON.stringify(props.matchMentorings)}</span>
      <span>{JSON.stringify(props.completeMentorings)}</span> */}
      <div>
        <span className="mentoring_list__table_header">멘토링 확정</span>
          <table>
            <thead>
              <tr>
              <th>No.</th>
              <th>멘티</th>
              <th>멘토</th>
              <th>시간</th>
                <th>직무</th>
                <th>기업</th>
              </tr>
            </thead>
            <tbody>
            {props.matchMentorings.map((mentoring) => (
              <tr key={mentoring.mentoringId}>
                <td>{mentoring.mentoringId}</td>
                <td>{mentoring.mentee.name}</td>
                <td>{mentoring.mentor.name}</td>
                <td>{dateToString(mentoring.time)}</td>
                <td>{mentoring.job}</td>
                <td>{mentoring.company}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div>
        <span className="mentoring_list__table_header">멘토링 완료</span>
          <table>
            <thead>
              <tr>
              <th>No.</th>
              <th>멘티</th>
              <th>멘토</th>
              <th>시간</th>
                <th>직무</th>
                <th>기업</th>
              </tr>
            </thead>
            <tbody>
            {props.completeMentorings.map((mentoring) => (
              <tr key={mentoring.mentoringId}>
                <td>{mentoring.mentoringId}</td>
                <td>{mentoring.mentee.name}</td>
                <td>{mentoring.mentor.name}</td>
                <td>{mentoring.time}</td>
                <td>{mentoring.job}</td>
                <td>{mentoring.company}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default MentoringList;
