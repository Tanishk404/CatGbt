import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserCont } from '@/context/UserContext'
import clsx from 'clsx'
import CatLoading from '../CatAnimate/CatLoading'

function UserDash() {

    const [imgState, setImg ] = useState()
    const [Input, setInput ] = useState('')

    const [url, setImgUrl] = useState(null)

    const [state, setState] = useState(null)
    const {setRefreshUser, refreshUser, hideUserDashboard, setHideUserDashBoard} = useContext(UserCont)

    const [loading, setLoading ] = useState(null)

    const HandleUpdate = async (e) => {

        e.preventDefault()
        const formData = new FormData()
        if(imgState){
            formData.append('image', imgState)
        }
        formData.append('updatedname', Input) 
        const token = localStorage.getItem('token')
        setLoading(true)
            try {
                const response =  await axios.post(`${import.meta.env.VITE_API_URL}/user/dashboard`,formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setHideUserDashBoard(false)

                console.log(response)
                setState(response.data.checkAvatar)

                setRefreshUser(!refreshUser)

            } catch (error) {
                console.log(error.message)
            } finally{
                setLoading(false)
            }
        }


    
    const handleUserImage = (e) => {
        const file = e.target.files[0]
        if(file){
            setImg(file)
            const url = URL.createObjectURL( e.target.files[0])
            setImgUrl(url)

        }


    }



    useEffect(() => {
        const fun = async () =>{
            const token = localStorage.getItem('token')
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
})

                setState(res.data.user)

                setInput(res.data.user.username)
                
            } catch (error) {
                console.log(error.message)
            }
        }

        fun()

    },[])



  return (
    <>
         {
            loading ?<div className='z-[100] flex items-center justify-center'>
                <CatLoading /> 
            </div>: null 
         }
            
      <div className={clsx('w-full flex justify-center absolute z-50 bg-black/50 h-full overflow-hidden left-0 top-0 p-2', hideUserDashboard ? 'flex': 'hidden')}>
        <div className='bg-white shadow-2xl w-96 h-96 top-20 flex flex-col justify-center rounded-xl items-center relative'>
        <form className='w-full flex flex-col items-center ' onSubmit={HandleUpdate}>
            <label htmlFor="userImage" className='flex w-24 relative rounded-full h-24 -top-10'>
                
            <input onChange={handleUserImage} className='opacity-0 h-32 -mt-10 w-32 rounded-full' id='userImage' name='userImage' type="file" accept='image/*' />

       
                        <img src={url || state?.avatar}  className='h-24 w-24 rounded-full object-cover border text-1xl absolute' alt='avatar' />

    
    

            </label>

            <div className='flex flex-col gap-5 justify-center w-full items-center p-2'>

                <div className='relative w-full'>
                    <label className='absolute text-[10px] top-1 left-2'>Display  name</label>
                    <input type="text"
                    name='updatedname' 
                    placeholder=' '
                    onChange={(e) => setInput(e.target.value)}
                    value={Input} className='text-xs h-14 outline-1 w-full outline-gray-400 pl-2 rounded-md border-[2px]' />
                </div>



                <div className='flex gap-5 absolute right-2 top-[330px]'>
                    <button onClick={()=>setHideUserDashBoard(false)} type='button' className='border border-black  p-1 w-20 rounded-lg text-sm'>Cancel</button>

                    <button
                    
                    type='submit' className='bg-black text-white p-1 w-20 rounded-lg text-sm'>Save</button>

                </div>
            </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default UserDash