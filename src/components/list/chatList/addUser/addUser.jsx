import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./addUser.css";
import { db } from "../../../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = ({ toggleAddMode }) => {
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false); // To track if the user is already added
  const [notFound, setNotFound] = useState(false); // To track if user is found
  const { currentUser } = useUserStore();

  // searching data from the database
  const handleSearch = async (e) => {
    e.preventDefault();
    setUser(null); // Reset user state
    setUserExists(false); // Reset userExists state
    setNotFound(false); // Reset notFound state

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        const foundUser = querySnapShot.docs[0].data();
        setUser(foundUser);

        // Check if the user is already added in the currentUser's chats
        const userChatsRef = doc(db, "userchats", currentUser.id);
        const userChatsDoc = await getDoc(userChatsRef); // Fetching user chats document
        const chats = userChatsDoc.data()?.chats || [];

        // Check if the user is already in the chat list
        const isAlreadyAdded = chats.some(
          (chat) => chat.receiverId === foundUser.id
        );
        setUserExists(isAlreadyAdded);
      } else {
        setNotFound(true); // Set notFound to true if no user is found
      }
    } catch (err) {
      console.log(err);
    }
  };




  const handleAdd = async () => {
    // Prevent adding if user already exists in the chats
    if (userExists) {
      return;
    }

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      // Create a new chat document in the 'chats' collection
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Update both users' chat lists (currentUser and the user being added)
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      toggleAddMode(); // Close AddUser component after adding user
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>

      {notFound && <p>User Not Found</p>} {/* Display if user not found */}

      {/* Fixed the JSX syntax */}
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>
              {user.username} {userExists && "(Already Added)"} {/* Show 'Already Added' if user exists */}
            </span>
          </div>
          <button onClick={handleAdd} disabled={userExists}>
            Add User
          </button> {/* Disable Add button if user exists */}
        </div>
      )}
    </div>
  );
};

export default AddUser;
