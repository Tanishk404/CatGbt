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

function Layout({children, searchChat, setSearchChat}) {

  const [state, ChangeState] = useState(false)
  const {titles, setTitles} = useContext(TitleContext)
  return (
    <SidebarProvider>
      <OpenImg>
              <TitleContext.Provider value={{titles, setTitles}} >




      <OverLay></OverLay>
   

    <div className='h-[100dvh] flex flex-col overflow-hidden'>

          <Nav />
      
        <div className='flex items-center flex-1 overflow-hidden'>
            
            <MobileBar titles={titles} setTitles={setTitles} />
            
            
            <SideBar searchChat={searchChat} setSearchChat={setSearchChat} titles={titles} setTitles={setTitles} />
        
        
            <div className='w-full flex flex-col justify-center text-center'>
                <div className=''>
    

                  {children}
              
               </div>
              
      
            </div>
            
        </div>
    </div>
              </TitleContext.Provider>
      </OpenImg>
    </SidebarProvider>
  )
}

export default Layout