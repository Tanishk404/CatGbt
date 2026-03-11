import React, { useContext } from 'react'
import Nav from '../components/NAV/Nav'
import SideBar from '../components/SideBar/SideBar'


import Input from '../components/InPutChat/Input'

import CatPeeping from "../components/CatAnimate/CatPeeping"
import { useState } from 'react'
import SidebarProvider from '@/context/SidebarContext'
import MobileBar from '../components/SideBar/MobileBar'
import { ToastContainer } from 'react-toastify'

import Dictaphone from "../components/SpeechText"

import OpenImg from '@/context/OpenImg'

import OverLay from './OverLay'
import SearchChat from '@/components/SearchChat'
import { TitleContext } from '@/context/TitleContextComp'
import Theme from '@/context/Theme'
import { ThemeContext } from '@/context/Theme'
import SkiperGifDemo from '@/components/ThemeComponent'
import { UserCont } from '@/context/UserContext'
import MiniDashBoard from '@/components/MiniDashBoard/MiniDashBoard'


function Home() {
  const [state, ChangeState] = useState(false)

  const {titles, setTitles} = useContext(TitleContext)

  const [searchChat, setSearchChat] = useState(false)

  const [isLoading, setLoading] = useState(null)

  const [messages, setMessage] = useState([])

  const [Animate, setAnimate] = useState(null);


  const {theme, setTheme} = useContext(ThemeContext)

  const [y, setY] = useState(0)

  return (
    <SidebarProvider>

      <ToastContainer />

    {/* theme Changes with useContext */}

  

 
      <OpenImg>

      <OverLay></OverLay>
   
          
         <div className='flex justify-center'>
           <SearchChat className='ml-56'  searchChat={searchChat} setSearchChat={setSearchChat} />
         </div>

    <div className='h-[100dvh] flex flex-col overflow-hidden'>

          <Nav />
         
    


        <div className='flex items-center flex-1 max-h-screen h-full overflow-hidden'>
            
            <MobileBar searchChat={searchChat} setSearchChat={setSearchChat} titles={titles} setTitles={setTitles} />
            
            
            <SideBar 
              titles={titles}
              setTitles={setTitles}
              searchChat={searchChat}
              setSearchChat={setSearchChat}
              />

                  <MiniDashBoard />
        
        
            <div className='w-full flex-1 flex flex-col justify-center text-center'>
                <div className=''>
    

                  <h1 className='text-3xl mb-10'>HELLO WORLD</h1>
              
               </div>
               <div className='flex
               justify-center flex-col gap-5 items-center relative p-4'>
                <div className={`flex
               justify-center flex-col gap-5 items-center relative w-full `}>
        

            
                    <CatPeeping state={state} />
                
                    <Input isLoading={isLoading} setLoading={setLoading} ChangeState={ChangeState} setMessage={setMessage} />
                  </div>
                <small className='text-gray-500'>For better AI components, check out AI Elements</small>
               </div>
      
            </div>
            
        </div>
    </div>
      </OpenImg>

    </SidebarProvider>
  )
}

export default Home