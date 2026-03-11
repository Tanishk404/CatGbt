import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const ThemeContext = createContext()
function Theme({children}) {
const [theme, setTheme] = useState('dark')
  return (
        <ThemeContext.Provider value={{theme, setTheme}}>
          <div>
            {children}
          </div>
        </ThemeContext.Provider>
  )
}

export default Theme