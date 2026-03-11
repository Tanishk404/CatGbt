import React, { createContext } from 'react'
import { useState } from 'react'

export const UserCont = createContext()


function UserContext({children}) {

  const [isUser, setIsUser] = useState(null) 
  const [Isavatar, setAvatar] = useState(null) 

  return (
    <UserCont.Provider value={{isUser, setIsUser, Isavatar,setAvatar }} >
        {children}
    </UserCont.Provider>
  )
}

export default UserContext