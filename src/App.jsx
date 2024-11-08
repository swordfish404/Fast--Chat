import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {

  //  const user=false;
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    // it is authentication listener which return callback if authentication state changes
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    })

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  //  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>

  return (
    <Router>
      <div className='container'>
        {/* there will be three components lets write--- 
        chat, list, detail */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            currentUser ? (
              <>
                <List />
                {chatId && <Chat />}
                {chatId && <Detail />}
              </>
            ) : (<Navigate to="/login" replace />)
          } />
          {/* Catch-all route to redirect to /home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Notification />
      </div>
    </Router>
  )
}

export default App;
