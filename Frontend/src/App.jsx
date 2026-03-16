import React from 'react'
import Home from './Pages/Home'
import ChatPage from "./Pages/ChatPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SidebarProvider from './context/SidebarContext'
import OpenImg from './context/OpenImg'
import ThemeContext from './context/Theme.jsx'
import { useContext } from 'react'
import TitleContextComp from './context/TitleContextComp'
import Theme from './context/Theme.jsx'
import DeleteAndRename from './context/DeleteAndRename'
import UserContext from './context/UserContext'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import OffToggle from './context/OffToggle'

function App() {
  
  return (
    <Theme>
      <OffToggle>

      <UserContext>

      <TitleContextComp>
        

    <DeleteAndRename>
      

    <SidebarProvider>

      <OpenImg>

    <div className=''>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />
      </Routes>


    </div>
    </OpenImg>
    </SidebarProvider>
    </DeleteAndRename>
      </TitleContextComp>
      </UserContext>
      </OffToggle>
    </Theme>
  )
}

export default App