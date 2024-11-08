import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { getDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {

  // for changing plus >> minus png in 
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();




  const [chats, setChats] = useState([]);
  // for fetching chat list from firestore 
  useEffect(() => {
    // onSnapshot firestore function to listen realtime-updates from database 
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data()?.chats || []; // Safely access chats

      const promises = items.map(async (item) => {
        // fetching data
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();
        // returning the user and the last chat
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      // sorting it so the last chat will come up in the top
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    // this is clean up function  
    return () => {
      unSub();
    };
  }, [currentUser.id]);




  // opning individual chats
  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });

      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err)
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );




  // Toggle function to control addMode state
  const toggleAddMode = () => setAddMode((prev) => !prev);





  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Search" onChange={(e) => setInput(e.target.value)} />
        </div>

        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={toggleAddMode} // Toggle add mode
        />
      </div>

      {filteredChats.map((chat, index) => (
        <div
          className="item"
          key={`${chat.chatId}-${index}`}  // Combining chatId with index for a unique key
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "rgba(6, 117, 58, 0.61)",
          }}
        >
          <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span> {/* Display username */}
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser toggleAddMode={toggleAddMode} />}
    </div>
  );
};

export default ChatList;
