// input 태그의 텍스트를 입력하는 박스 위젯입니다.

function Text(props: any){
    switch (props.item){
        case 'id':
            return <input className="input_text" type="text" name="id" id="id" placeholder="email@email.com" onChange={(data) => props.sItem(data)} />
        case 'pwd':
            return <input className="input_text" type="password" name="pwd" id="pwd" placeholder="your password" onChange={(data) => props.sItem(data)} />
        case 'job':
            return <input type="text" className="input_text" name="job" id="job" placeholder="BACK-END"/>
        case 'ssafy_id':
            return <input className="input_text" type="text" name="ssafy_id" id="ssafy_id" placeholder="0123456"/>
        case 'name':
            return <input className="input_text" type="text" name="name" id="name" placeholder="KIM SSAFY"/>
        case 'company':
            return <input type="text" className="input_text" name="company" id="company" placeholder="삼성전자"/>
        default:
            return null;
    }
}

export default Text;