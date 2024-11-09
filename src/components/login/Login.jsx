import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  // For the Avatar Image
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // Registering
  // Function for creating a new user with Firebase authentication
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FormData is object which bundles up data which will be sent to the server
    // saved as key , value pair
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    // creating a new user
    try {
      // creates new user record in firebase authentication system
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // For Uploading avatar image in firebase storage
      // it is await coz firebase storage returns the url of the image takes time  
      let imgUrl = "";
      if (avatar.file) {
        imgUrl = await upload(avatar.file);
      }

      // storing user information in firestore database 
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl, // imgUrl will be stored in firestore database
        id: res.user.uid,
        blocked: [],
      });

      // for new user after registration the chats will be empty  
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account Created! You Can Login Now.");

      // Redirect to root ("/") after successful registration
      window.location.assign("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function for logging in an existing user with Firebase authentication
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");

      // Redirect to root ("/") after successful login
      window.location.assign("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // For already registered user
    <div className="login">
      <div className="item">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      </div>

      <div className="separator"></div>

      {/* For new user registration */}
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" required />
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
