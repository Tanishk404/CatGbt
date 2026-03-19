import React, { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const ThemeContext = createContext()

function Theme({children}) {

const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

useEffect(() => {
  const root = document.documentElement;

  root.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
},[theme])
  return (
        <ThemeContext.Provider value={{theme, setTheme}}>
          <div>
            {children}
          </div>
        </ThemeContext.Provider>
  )
}

export default Theme