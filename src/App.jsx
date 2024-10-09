import Chat from "./components/chat/Chat"
import Detail from "./components/detail/detail"
import List from "./components/list/List"
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

const App = () => {
   
   const user=true;

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