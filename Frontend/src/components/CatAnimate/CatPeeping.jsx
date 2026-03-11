import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import OrangePeepingCat from "../../LottieJson/OrangeCatPeeping.json"

import CatKeepingTopJson from "../../LottieJson/OrangeCatPeeping2.json"

import clsx from 'clsx'

function CatPeeping({state}) {
  const [catState, setCatState] = useState(OrangePeepingCat)
  useEffect(() => {
    setTimeout(() => {
      setCatState(CatKeepingTopJson)
    },2000)
  }, [])

  return (
    <div className={clsx('w-28 -top-[200px] ml-2 absolute', 
      state ? 'transition-all ease-out translate-y-6' : 'block'
    )}>
        <Lottie animationData={catState} loop={true}/>
    </div>
  )
}

export default CatPeeping