import clsx from 'clsx'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { CircleX, MessageCircle, MessageSquare, SquarePen } from 'lucide-react'
import { TitleContext } from '@/context/TitleContextComp'
import { Link } from 'react-router-dom'
function SearchChat({searchChat, setSearchChat}) {

  const {titles, setTitles} = useContext(TitleContext);
  const [Searchstate, setSearchData] = useState('')





  const InPutHandle = (e) => {
    setSearchData(e.target.value);
  }

  const data = titles && titles.filter(v => v.title.toLowerCase().includes(Searchstate.toLowerCase()))




  





  return (
    <div className={clsx('justify-center flex w-screen h-screen bg-black/50 absolute top-0 left-0 z-[100] p-2 overflow-hidden',searchChat ? 'block': 'hidden' )}> 




    <div className={clsx('bg-[rgb(236,233,233)] overflow-y-hidden z-[100] w-full max-w-[30rem] absolute overflow-hidden h-full md:max-h-[25rem] shadow-lg lg:max-h-[25rem mt-20 rounded-lg pb-10 p-1',
      searchChat ? 'block': 'hidden'
    )}>
      <button onClick={() => {setSearchChat(!searchChat)}} className='rounded-full absolute right-0 cursor-pointer' >

        <CircleX  className='text-black ' />
      </button>

 
            <input value={Searchstate} onChange={InPutHandle} className='p-2 bg-[#ebe8e8] outline-none w-96 m-2 lg:w-full md:w-full xl:w-full border-b border-gray-300 left-0  mb-4' type="text" placeholder='search chat here'/>

        <div className='w-full text-start h-[100%] lg:h-80 md:h-80 xl:h-80 overflow-y-auto flex flex-col p-4'>
          <Link to={"/"} className='mt-2 hover:bg-slate-100 p-1 rounded-lg flex gap-5 text-sm'><SquarePen className='w-5 text-gray-700' /> New chat</Link>
          <hr />
          {

          data.map((v,i) => {
              return(

                <Link key={v._id} to={`chat/${v._id}`} className='mt-6 hover:bg-slate-100 p-1 rounded-lg flex gap-5'><MessageSquare className='text-sm text-gray-500 w-4 ' /> {v.title}</Link>

              )
            })
          }
        </div>
    </div>
            </div>
  )
}

export default SearchChat