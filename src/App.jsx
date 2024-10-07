import Chat from "./components/chat/Chat"
import Detail from "./components/detail/detail"
import List from "./components/list/List"

const App = () => {
  return (
    <div className='container'>
    {/* there will be three components lets write---
     chat, list, detail */}
    
    <List/>
    <Chat/>
    <Detail/>
    </div>
  )
}

export default App