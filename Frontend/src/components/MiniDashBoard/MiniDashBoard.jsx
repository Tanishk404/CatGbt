import React, { useContext,useState, useEffect } from 'react'
import { UserCont } from '@/context/UserContext'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'


function MiniDashBoard({dashBoard, setDashBoard,setTitles}) {
    const navigate = useNavigate()
    const {isUser, setIsUser, Isavatar, setAvatar} = useContext(UserCont)



    const avatarUrl = `https://ui-avatars.com/api/?name=${Isavatar}&length=1&background=000000&color=ffffff&size=256&rounded=true`
    
        useEffect(()=>{
            isUser?.map((v,i) => {
                return(
                    setAvatar(v.username)
            )
        });
    },[isUser])

    const LogOut = () => {
        localStorage.removeItem('token')
        setIsUser(null)
        setTitles([])
        setTimeout(() => {
            navigate('/user/login');
        }, 1000)
    }
  return (
    <div className={clsx('absolute p-10 ', dashBoard&&isUser ? 'block': 'hidden')}>
    <div className='h-36 bg-gray-300 shadow-lg p-1 w-36 absolute z-[100] rounded-xl top-40'>
        {
            isUser?.map((v, i) => {
                return(
                    <div key={i}>
                        <div className='flex gap-2 justify-center items-center'>
                            <img className='w-6 h-6' src={avatarUrl} alt="avatar" />
                            <div>
                                <p className='text-sm'>{v.username}</p>
                        <p className='truncate  text-xs w-20'>{v.email}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        <button className='mt-10 bg-black text-white text-center flex justify-center rounded-lg items-center p-2 text-xs h-8 ml-10' onClick={LogOut}>Logout</button>
    </div>


    </div>
  )
}

export default MiniDashBoard