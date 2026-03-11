import React from 'react'
import LoadingCat from "../../LottieJson/LoadingCat.json"
import Lottie from "lottie-react"

function CatLoading() {
  return (
    <div className='w-32'>
        <Lottie animationData={LoadingCat} loop={true} />
    </div>
  )
}

export default CatLoading