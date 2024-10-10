import { useEffect } from "react";
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/detail"
import List from "./components/list/List"
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const App = () => {
   
   const user=false;

   useEffect(()=>{
       const unSub = onAuthStateChanged(auth,(user)=>{
        console.log(user);
       })

       return () =>{
        unSub();
       };
   },[])

  return (
    <div className='container'>
    {/* there will be three components lets write---
     chat, list, detail */} 
     {
      user? (  
    <>          
    <List/>
    <Chat/>
    <Detail/>
      </> 
    ) : (<Login/>)
   }

   <Notification/>
    </div>
  )
}

export default App