import React, { createContext } from 'react'

interface Context{
    isLoggedIn:boolean,
    // loggedIn: () => void
    // loggedOut: () => void
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
}

export const MyContext = createContext<Context>({isLoggedIn:false, setIsLoggedIn:() => {}})




