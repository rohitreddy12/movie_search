import React, { createContext } from 'react'

interface Context{
    isLoggedIn:boolean,
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
}

interface FavContext{
    favIds:string[],
    setFavIds:React.Dispatch<React.SetStateAction<string[]>>
}


export const MyContext = createContext<Context>({isLoggedIn:false,setIsLoggedIn:() => {}})
export const FavContext = createContext<FavContext>({favIds: [] ,setFavIds: () => {} })



