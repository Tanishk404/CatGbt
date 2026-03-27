import React, { useReducer, useState } from 'react'
import TypingCat from '../components/CatAnimate/TypingCat'
import Nav from '@/components/NAV/Nav'
import Layout from '@/components/Layout'
import { Link } from 'react-router-dom'
import { Eye, EyeClosed } from 'lucide-react'
import clsx from 'clsx'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import CatLoading from '@/components/CatAnimate/CatLoading'
function SignUp() {
  const intialState = {
    fullname: '',
    emailid: '',
    password: ''
  }

  const navigate = useNavigate()


  const [currentState, setState] = useState(intialState);
  const [isLoading, setLoading] = useState(null)

  function onChangeHua (e){
    const {name, value} = e.target
    setState((prev) =>( {
      ...prev,
      [name]: value
    }))
  } 

  const HandleForm = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, currentState)


    const successMsg = res.data.message
    toast.success(successMsg)
    console.log(successMsg)

    
    setState({
      fullname: '',
      emailid: '',
      password: ''
    })
    
    setTimeout(() => {
      navigate('/user/login')
    },1500)
    
    } catch (error) {
      const errmsg = 'Something went wrong'
      toast.error(errmsg)
      console.log(error)
      
    }
    finally{
      setLoading(false)
    }

  }


  const [show, setShowPass] = useState(false)

  return (
    <Layout>
    <div className='w-full h-dvh flex flex-col justify-around justify-items-center items-center align-middle text-center dark:bg-[#1e1e1e] bg-[#EBE8E8] pb-20 pt-20 pr-8 pl-8 md:pt-20 lg:pb-20 '>
      {
        isLoading &&
      <div className='absolute items-center flex justify-center z-50 bg-black/50 w-full h-full left-0 top-0'>
      <CatLoading />
      </div>
      }

        <ToastContainer></ToastContainer>
        <div className='flex border w-full ld:max-w-[70rem] md:max-w-[70rem] h-full border-gray-400 rounded-xl  flex-col lg:flex-row md:flex-row relative shadow-lg shadow-orange-400'>

        <form onSubmit={HandleForm} className=' h-full max-h-[40rem] w-full max-w-[30rem] flex flex-col gap-10 bg-inherit p-4 pt-10 flex-1 rounded-l-xl z-40'>

            <input required={true} onChange={onChangeHua} value={currentState.fullname} name='fullname' className='p-4 border-b border-gray-400 bg-inherit outline-none rounded-lg' type="text" placeholder='Enter full name' />
            <input required={true} onChange={onChangeHua} value={currentState.emailid} name='emailid' className='p-4 border-b border-gray-400 bg-inherit outline-none rounded-lg' type="email" placeholder='Enter email id' />

            <div className='flex w-full'>
                <input required={true}  onChange={onChangeHua} value={currentState.password} name='password' minLength='8' className='p-4 border-b border-gray-400 bg-inherit outline-none rounded-lg' type={show ? 'text': 'password'} placeholder='Enter you password'/>
                {
                  currentState.password.length > 0 && 
(                <button type='button' onClick={() => {setShowPass(!show)}}>
                  {
                    show ? 
                    <Eye /> : 
                <EyeClosed /> 
                  }
                </button>)
              }
            </div>

            <button type='submit' className='h-10 mt-10 rounded-lg w-full p-2 dark:hover:bg-orange-300 bg-orange-400 text-white'>Sign Up</button>
            <Link className='-mt-8 md:mt-0 lg:mt-0 ' to={'/user/login'} >Already have a account</Link>

        
        </form>


<TypingCat />



        </div>
    </div>
    </Layout>
  )
}

export default SignUp