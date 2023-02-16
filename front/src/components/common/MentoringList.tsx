import "../../styles/components/common/mentoring-list.css";

function MentoringList(props: any) {
  function dateToString(mentoringdate: string){

    const date = new Date(mentoringdate);
    const formattedTime = date.toLocaleString("ko-KR", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric",});
    return formattedTime;
  }
  return (
    <div className="mentoring_list_component">
        <span className="mentoring_list__table_header ">멘토링 확정</span>
      <div className="my_reserved_mentoring_table">
          <table >
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
            <tbody >
            {props.matchMentorings.map((mentoring : any) => (
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

        <span className="mentoring_list__table_header">멘토링 완료</span>
        <div className="my_complete_mentoring_table">
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
            {props.completeMentorings.map((mentoring : any) => (
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
    </div>
  );
}

export default MentoringList;
