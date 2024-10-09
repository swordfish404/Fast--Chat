import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
const Login = () => {
 
  // using use state hook for if upload a img it will be set to profile pic   
   const[avatar,setAvatar] = useState({
    file:null,
    url:""
   })  

   const handleAvatar = e =>{
     if(e.target.files[0]){
    setAvatar({
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
    })
     }
   }


   // for the warning notification using react-toastify
   const handleLogin= e=>{
    e.preventDefault()
    // toast.warn("Hello")
   }

  return (
    <div className='login'>Login
       <div className="item">
        <h2>Welcome Back</h2>
        <form  onSubmit={handleLogin}>
            <input type="text" placeholder="Email" name="email" />
            <input type="text" placeholder="Password" name="password" />
            <button>Sign In</button>
        </form>
       </div>
       <div className="separator"></div>
       <div className="item">
       <h2>Create an Account</h2>
        <form action="">
             <label htmlFor="file">
                <img src={avatar.url || "./avatar.png"} alt="" />
                Upload an image</label>
            <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
            <input type="text" placeholder="Username" name="username" />
            <input type="text" placeholder="Email" name="email" />
            <input type="text" placeholder="Password" name="password" />
            <button>Sign Up</button>
        </form>
       </div>
    
    </div>
  )
}

export default Login