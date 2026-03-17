import React from 'react'
import TypingCat from '../components/CatAnimate/TypingCat'
import Nav from '@/components/NAV/Nav'
import Layout from '@/components/Layout'
import { Link } from 'react-router-dom'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [show, setShowPass] = useState(false)
    const [currentState, setState] = useState({
      emailid: '',
      password: ''
    })

    const navigate = useNavigate()

    const OnChanFunc = (e) => {
      const {name, value} = e.target;
      setState((prev)=> ({
        ...prev,
        [name] : value
      }))
      
    }

    const FormHandle = async (e) => {
      e.preventDefault()
      try {
        
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, currentState)

        const successMsg = res.data.message
        toast.success(successMsg)

        // Getting Token From Backend Response And Save in LocalStorage Frontend
        const TokenFromBackend = res.data.token
        localStorage.setItem("token", TokenFromBackend)
        
        setState({
          emailid: '',
          password: ''
        })
        
        setTimeout(() => {
          navigate("/")
        }, 1000);

      

      } catch (error) {
        const errmsg = error.response.data.message || 'Something went wrong'
        toast.error(errmsg)
        
        console.log(error.message);
      }

    }



  return (
    <Layout>

    <div className='w-full h-dvh flex flex-col justify-around justify-items-center items-center align-middle text-center bg-[#EBE8E8] pb-20 pt-20 pr-8 pl-8 md:pt-20 lg:pb-20 '>
        <ToastContainer></ToastContainer>
        <div className='flex border w-full ld:max-w-[70rem] md:max-w-[70rem] h-full border-gray-400 rounded-xl flex-col lg:flex-row md:flex-row relative'>

        <form onSubmit={FormHandle} className=' h-full max-h-[40rem] w-full lg:max-w-[30rem] md:max-w-[30rem] flex flex-col gap-10 bg-inherit p-4 pt-10 flex-1 rounded-l-xl z-40'>

            <input name='emailid' value={currentState.emailid} onChange={OnChanFunc} className='p-4 border-b border-gray-400 bg-inherit outline-none rounded-lg' type="email" placeholder='Enter email id' />
                    <div className='flex w-full'>
                        <input value={currentState.password} onChange={OnChanFunc} name='password' className='p-4 border-b border-gray-400 bg-inherit outline-none rounded-lg' type={show ? 'text': 'password'} placeholder='Enter you password'/>
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
        

            <button type='submit' className='h-10 mt-20 rounded-lg w-full p-2 bg-orange-400 text-white'>Login</button>

            <Link to={'/user/signup'} >Register before login</Link>
        
        </form>


    
                <TypingCat />
        



        </div>
    </div>
    </Layout>
  )
}

export default Login