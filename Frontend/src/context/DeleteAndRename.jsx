import React, { createContext, useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TitleContext } from './TitleContextComp';

export const DeleteAndRenameContext = createContext()


function DeleteAndRename({children}) {
    const navigate = useNavigate()
    const {titles, setTitles} = useContext(TitleContext)

    const [ThreeDot, setThreeDot] = useState(null);
    const [menuId , setOpenMenuId] = useState(null)  
    const [Rename, setRename] = useState();
    const [RenameValue, setRenameValue] = useState('');


    
    const token = localStorage.getItem("token")

        const HandleRename = async (chatId) => {
    
          if(!RenameValue.trim()) return;
          try {


            console.log(token)
            
            await axios.put(`http://localhost:3000/titles/${chatId}`, {
                title: RenameValue
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }}
               
            )
    
            setTitles((prev) =>
                prev.map((item) =>
                    item._id === chatId ? { ...item, title: RenameValue } : item
                )
            )
    
        
            setRename(null);
            setOpenMenuId(null);
            setRenameValue('');
            
          } catch (error) {
            console.log('Error in Rename Title',error)
          }
        }
    
        
    
        const HandleDeleteChat = async (chatId, ActiceId) => {
            try {
               await axios.delete(`http://localhost:3000/chat/delete/${chatId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                    }
               }
          
               );
    
               setTitles((prev) => 
                prev.filter((item) => item._id !== chatId)
                )
            
                setOpenMenuId(null);
    
            if(ActiceId === chatId){
                navigate('/')
            }
                
            } catch (error) {
                console.log("deleting error")
            }
        }








  return (
    <DeleteAndRenameContext.Provider value={{ThreeDot, setThreeDot, Rename, setRename, RenameValue, setRenameValue, HandleRename, HandleDeleteChat, menuId, setOpenMenuId}}>
        {children}
    </DeleteAndRenameContext.Provider>
  )
}

export default DeleteAndRename