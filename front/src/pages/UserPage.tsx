import { Route,Routes } from "react-router"
import Login from "../components/user/Login"
import Join from "../components/user/Join"

function UserPage (){
    return(
        <div>
            <Routes>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/join" element={<Join></Join>}></Route>
            </Routes>
        </div>
    )
}

export default UserPage