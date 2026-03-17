import React, { useContext,useState, useEffect } from 'react'
import { UserCont } from '@/context/UserContext'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { LogOutIcon, Settings, SunMoon } from 'lucide-react'


function MiniDashBoard({dashBoard, setDashBoard,setTitles}) {
    const navigate = useNavigate()
    const {isUser, setIsUser, Isavatar, setAvatar, setHideUserDashBoard, hideUserDashboard} = useContext(UserCont)

    



    const avatarUrl =`${import.meta.env.VITE_AVATAR_URL}?name=${Isavatar}&length=1&background=000000&color=ffffff&size=256&rounded=true`;
    
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
    <div className={clsx('absolute p-2 ', dashBoard&&isUser ? 'block': 'hidden')}>
    <div className='h-36 gap-4 bg-gray-300 shadow-lg flex flex-col p-1 w-52 md:w-36 lg:w-36 absolute z-[100] mt-1 md:mt-0 lg:-mt-5 rounded-xl top-48 lg:top-36 md:top-36'>
        {
            isUser?.map((v, i) => {
                return(
                    <div key={i}>
                        <div className='flex gap-2 justify-start items-center cursor-pointer hover:bg-white rounded-xl' onClick={()=> {setHideUserDashBoard(!hideUserDashboard)
                            setDashBoard(!dashBoard)
                        }}>
                            <img className='w-8 h-8 rounded-full' src={v.avatar || avatarUrl} alt="avatar" />
                            <div>
                                <p className='text-sm truncate'>{v.username}</p>
                        <p className='truncate  text-xs w-20'>{v.email}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        <button className='mt-2 text-xs flex gap-2 items-center hover:bg-white p-1 rounded-lg'>
            <Settings className='w-4 h-4' />
            Settings
            </button>
        <button className='mt-2 bg-black text-white text-center flex justify-center rounded-lg gap-2 items-center p-2 text-xs h-6 ' onClick={LogOut}><LogOutIcon className='w-4 h-4'/> Logout</button>
    </div>


    </div>
  )
}

export default MiniDashBoard