import React, { createContext } from 'react'
import { useState } from 'react'

export const UserCont = createContext()


function UserContext({children}) {
const [refreshUser, setRefreshUser] = useState(false)
  const [isUser, setIsUser] = useState(null) 
  const [Isavatar, setAvatar] = useState(null) 

  const [hideUserDashboard, setHideUserDashBoard] = useState(false);

  return (
    <UserCont.Provider value={{isUser, setIsUser, Isavatar,setAvatar, refreshUser, setRefreshUser, hideUserDashboard, setHideUserDashBoard }} >
        {children}
    </UserCont.Provider>
  )
}

export default UserContext