import React, { createContext, useState } from 'react'

export const CaptainDataContext=createContext();

const CaptainContext = ({children}) => {

    const [captain, setcaptain] = useState({
        fullname:{
            firstname:'',
            lastname:''
        },
        email:'',
        vehicle:{
            color:'',
            plate:'',
            capacity:0
        }
    })

  return (
    <div>
        <CaptainDataContext.Provider value={{captain,setcaptain}}>
            {children}
        </CaptainDataContext.Provider>
      
    </div>
  )
}

export default CaptainContext
