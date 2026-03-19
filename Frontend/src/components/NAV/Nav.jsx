import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CatAnimate from "../CatAnimate/CatAnimate"
import  { PanelRightClose, PanelLeftClose } from "lucide-react"
import { SidebarContext } from "../../context/SidebarContext"
import { UserCont } from '@/context/UserContext'

function Nav() {
  const {isOpen, setIsOpen} = useContext(SidebarContext)

  const {isUser, setIsUser} = useContext(UserCont)

  
  
  return (
    <div className='w-full pr-7 bg-gray-200 dark:bg-[#1E1E1E] mt-0 p-2 flex h-16 justify-between z-40 absolute lg:static md:static xl:static'>
        <div>
          <CatAnimate />
          <button className='sm:hidden lg:hidden -mt-10 z-10 absolute md:hidden xl:hidden' onClick={() => {setIsOpen(!isOpen)}}>
              <PanelRightClose />
          </button>

          <button className='hidden sm:block lg:block -mt-10 z-10 absolute md:block xl:block' onClick={() => {setIsOpen(!isOpen)}}>
              {
                isOpen ? <PanelLeftClose /> :
                <PanelRightClose /> 
              }
          </button>
        </div>
        {/* <img src="https://www.logoai.com/oss/icons/2021/12/02/0kzXyqB8beTlVqf.png" alt="" className='h-16 ml-3'/> */}

        {
          isUser ?         <Link to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-dashed-icon lucide-message-circle-dashed"><path d="M10.1 2.182a10 10 0 0 1 3.8 0"/><path d="M13.9 21.818a10 10 0 0 1-3.8 0"/><path d="M17.609 3.72a10 10 0 0 1 2.69 2.7"/><path d="M2.182 13.9a10 10 0 0 1 0-3.8"/><path d="M20.28 17.61a10 10 0 0 1-2.7 2.69"/><path d="M21.818 10.1a10 10 0 0 1 0 3.8"/><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69"/><path d="m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98"/></svg></Link> : (<div className='flex gap-2'>
          <Link to={"/user/login"} className='text-xs bg-black text-white h-6 text-center justify-center flex p-2 rounded-2xl items-center' >Login</Link> 
          <Link className='text-xs border border-gray-500 rounded-2xl text-center justify-center items-center w-24 flex h-6 p-2 font-bold' to={"/user/signup"}>Sign up</Link>
          </div>)
        }
    </div>
  )
}

export default Nav