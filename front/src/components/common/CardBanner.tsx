import "../../styles/components/common/card-banner.css"
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { decrement, increment } from '../../store/counterSlice'
function CardBanner (){
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()
    return (
        <div className="card_banner" >
            <div className="cell_a"></div>
            <div className="cell_b"></div>
            <div className="cell_c">
                <div className="card_banner_content">
                    <p className="card_banner_header" onClick={()=>{dispatch(increment())}}>싸피챗이 무엇인가요? {count}</p>
                    <p className="card_banner_main">싸피챗을 시작해 보세요!</p>
                    <p className="card_banner_main">당신의 커리어를 위해</p>
                    <button className="card_banner_button" onClick={()=>{dispatch(decrement())}}>시작하기</button>
                </div>
            </div>
            <div className="cell_d"></div>
        </div>
    )
}

export default CardBanner