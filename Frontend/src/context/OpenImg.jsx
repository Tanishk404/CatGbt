import React, { useState } from 'react'
import { createContext } from 'react';

export const OpenImgContext = createContext(null);
function OpenImg({children}) {

    const [openImage , setOpenImage] = useState(false)

    const [mediaName, setMedia] = useState(null);

  return (

    <OpenImgContext.Provider value={{openImage, setOpenImage, mediaName, setMedia}}>
        {children}
    </OpenImgContext.Provider>

  )
}

export default OpenImg