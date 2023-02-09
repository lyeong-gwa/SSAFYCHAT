// input 태그의 props에 따라서 어떠한 형식을 갖을지 관장하는 위젯 입니다.

import Icon from "./InputIcon";
import Text from "./InputText";

function TextBox(props : any){
    return(
        <div className="text_box">
            <div className="text_icon draggable">
                <Icon item={props.item}></Icon>
            </div>
            <div className="text_text">
                <Text item={props.item} sItem={props.sItem}></Text>
            </div>
        </div>
    )
}

export default TextBox;