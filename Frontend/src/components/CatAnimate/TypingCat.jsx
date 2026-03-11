import React from 'react'
import Typing from "../../LottieJson/Cattyping.json"
import Lottie from "lottie-react"

function TypingCat() {
  return (
 

    <div className='bg-orange-200 flex-1 flex justify-center rounded-r-xl w-full absolute lg:static md:static z-0 max-w-[40rem]'>
        <Lottie animationData={Typing} loop={true} className='w-full xl:w-[80%]' />
  
    </div>

  )
}

export default TypingCat