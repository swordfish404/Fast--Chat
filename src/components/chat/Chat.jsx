import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
const Chat = () => {
 
   // using use state hook for the emoji button
   const [open,setOpen]=useState(false);
   const[text,setText]=useState("");
  
   // for auto scrolling to the end
   const endRef=useRef(null)

   useEffect(()=>{
     endRef.current?.scrollIntoView({behavior:"smooth"});
   },[])


   const handleEmoji= (e)=>{
    setText((prev)=>prev + e.emoji);
    setOpen(false)
   };
/* had to under stand.
.
. 
*/
  return (
    <div className='chat'>Chat

    {/* Top section starts here */}
      <div className="top">
        <div className="user">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Subrata Das</span>
                <p>Lorem ipsum dolor sit amet consectetur </p>
            </div>
        </div>
        <div className="icons">
            <img src="./phone.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./info.png" alt="" />
        </div>
      </div>

      {/* Center / main chat section starts here */}
      <div className="center">
         <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
           <p>The Quick Brown Fox Jumps over the lazy dog</p>
           <span>1 min ago</span>
           </div>
         </div>

         <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
           <p>The Quick Brown Fox Jumps over the lazy dog</p>
           <span>1 min ago</span>
           </div>
         </div>

         <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <img src="https://c8.alamy.com/comp/2H1D1Y8/spiderman-power-illustration-posing-hero-editorial-2H1D1Y8.jpg" alt="" />
           <p>The Quick Brown Fox Jumps over the lazy dog</p>
           <span>1 min ago</span>
           </div>
         </div>

         <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
           <p>The Quick Brown Fox Jumps over the lazy dog</p>
           <span>1 min ago</span>
           </div>
         </div>

         {/* using useRef hook for auto scrolling to the end of the message */}
         <div ref={endRef}></div>
      </div>


      {/* Bottom section starts here */}
      <div className="bottom">
        <div className="icons">
            <img src="./img.png" alt="" />
            <img src="./camera.png" alt="" />
            <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Type a message......." 
        value={text}
        onChange={e=>setText(e.target.value)}/>
        <div className="emoji">
            <img src="./emoji.png" alt="" 
            onClick={()=>setOpen(prev=>!prev)}
            />

            {/* Displaying the Emoji Picker */}
            <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
            </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}

export default Chat