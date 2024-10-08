import { useState } from "react"
import "./chatList.css"
import AddUser from "./addUser/addUser";
const ChatList = () => {

//   using usestate hook for change the "+" to "-" for searching   
 const [addMode,setAddMode]=useState(false)

  return (
    <div className='chatList'>
       <div className="search">
          <div className="searchBar">
            <img src="/search.png" alt="" />
            <input type="text" placeholder="Search"/>
          </div>
          <img src={addMode?"./minus.png" : "./plus.png"} 
          alt="" 
          className="add"
          // on clicking the previous state will be flipped
          onClick={()=>setAddMode((prev)=>!prev)}
          />
       </div>
       
       {/* adding chat items */}
       <div className="item">
           <img src="./avatar.png" alt="" />
           <div className="texts">
              <span>Bula Gharui</span>
              <p>Hello</p>
           </div>
       </div>

       <div className="item">
           <img src="./avatar.png" alt="" />
           <div className="texts">
              <span>Bula Gharui</span>
              <p>Hello</p>
           </div>
       </div>

       <div className="item">
           <img src="./avatar.png" alt="" />
           <div className="texts">
              <span>Bula Gharui</span>
              <p>Hello</p>
           </div>
       </div>
      {addMode && <AddUser/>}
    </div>
  );
}

export default ChatList