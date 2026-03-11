import React, { useContext, useEffect } from 'react'
import { OpenImgContext } from '../context/OpenImg'
import clsx from 'clsx'
import contextImage from '../components/InPutChat/Input'
import { X } from 'lucide-react';
function OverLay() {

  const {openImage, setOpenImage, mediaName, setMedia} = useContext(OpenImgContext)

  const CloseOverlay = () => {
      setOpenImage(false);

  }

  return (
    <div className={clsx('h-screen bg-black/50 w-screen fixed inset-0 z-[100] flex items-center justify-center', openImage ? 'block': 'hidden')}>
      <button onClick={CloseOverlay} className='absolute bg-white rounded-full h-6 w-6 top-2 right-2'>
        <X />
      </button>
        {
          mediaName && (
            <img className='w-96 h-96 object-contain' src={mediaName.url} alt="" />
          )
        }
    </div>
  )
}

export default OverLay