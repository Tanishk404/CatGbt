import React, { createContext, useRef } from 'react'

export const ToggleContext = createContext()
function OffToggle({children}) {
      const refDash = useRef(null)
  return (
    <ToggleContext.Provider value={refDash}>
        {children}
    </ToggleContext.Provider>
  )
}

export default OffToggle