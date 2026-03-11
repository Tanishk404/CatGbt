import React, { useState } from 'react'
import { createContext } from 'react'


export const TitleContext = createContext() 

function titleContext({children}) {
  const [titles, setTitles] = useState([])
  return (
      <TitleContext.Provider value={{titles, setTitles}} >
        {children}
      </TitleContext.Provider>

  )
}

export default titleContext