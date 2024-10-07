import ChatList from "./chatList/ChatList"
import "./list.css"
import Userinfo from "./userInfo/Userinfo"
const List = () => {
  return (
    <div className='list'>List
    <Userinfo/>
    <ChatList/>
    </div>
  )
}

export default List