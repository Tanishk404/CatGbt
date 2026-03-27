import React, { useContext } from 'react'
import Nav from '../components/NAV/Nav'
import SideBar from '../components/SideBar/SideBar'


import Input from '../components/InPutChat/Input'

import CatPeeping from "../components/CatAnimate/CatPeeping"
import { useState } from 'react'
import SidebarProvider from '@/context/SidebarContext'
import MobileBar from '../components/SideBar/MobileBar'


import Dictaphone from "../components/SpeechText"

import OpenImg from '@/context/OpenImg'

import OverLay from '../Pages/OverLay'
import SearchChat from './SearchChat'

import { TitleContext } from '@/context/TitleContextComp'
import MiniDashBoard from './MiniDashBoard/MiniDashBoard'
import clsx from 'clsx'

function Layout({children, searchChat, setSearchChat}) {

  const [state, ChangeState] = useState(false)
  const {titles, setTitles} = useContext(TitleContext)

  const [dashBoard, setDashBoard] = useState(false)

  return (
    <SidebarProvider>
      <OpenImg>
              <TitleContext.Provider value={{titles, setTitles}} >




      <OverLay></OverLay>
   

    <div className='h-[100dvh] flex flex-col overflow-hidden'>

          <Nav />
      
        <div className='flex flex-1 overflow-hidden'>
            
            <MobileBar titles={titles} setTitles={setTitles} dashBoard={dashBoard} setDashBoard={setDashBoard} setSearchChat={setSearchChat} searchChat={searchChat} />
            
            
            <SideBar searchChat={searchChat} setSearchChat={setSearchChat} titles={titles} setTitles={setTitles} dashBoard={dashBoard} setDashBoard={setDashBoard} />
        
        
          <div className='absolute top-96'>
            <MiniDashBoard setTitles={setTitles} dashBoard={dashBoard} setDashBoard={setDashBoard} />

          </div>
        
            <div className='w-full flex flex-1 overflow-hidden min-w-0 flex-col justify-center text-center'>
                
    

                  {children}
              
    
              
      
            </div>
            
        </div>
    </div>
              </TitleContext.Provider>
      </OpenImg>
    </SidebarProvider>
  )
}

export default Layout