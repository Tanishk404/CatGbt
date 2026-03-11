import React from 'react'
import CatLottie from "../../LottieJson/CatPlayingAnimation.json"
import Lottie from "lottie-react"
import { Link } from 'react-router-dom'

function CatAnimate() {
  return (
    <Link >
    <div className='w-32 cursor-pointer'>
      
        <Lottie animationData={CatLottie} loop={true} />
    </div>
    </Link>
  )
}

export default CatAnimate