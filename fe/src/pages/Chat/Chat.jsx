// import React from 'react'
import ChatBox from '../../Components/ChatBox/ChatBox'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../Components/RightSideBar/RightSideBar'
import './Chat.css'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSideBar/>
        <ChatBox/>
        <RightSideBar/>
      </div>
    </div>
  )
}

export default Chat