
import { Route, Router, Routes } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Favourites from './Pages/Favourites'
import Genres from './Pages/Genres'
import MovieDetails from './Pages/MovieDetails'
import NavBar from './Components/navbar'
import MainPage from './MainPage'
import { useState, createContext } from 'react'
import {MyContext,FavContext} from './MyContext'

function App() {
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
    const [favIds,setFavIds] = useState<string[]>([])
    

    return (
        
        
        <div>
            <FavContext.Provider value={{favIds,setFavIds}}>
            <MyContext.Provider value={{isLoggedIn ,setIsLoggedIn}}>
                <NavBar />
            <Routes>
                <Route path='/' element={<MainPage />} ></Route>
                <Route path='/favourites' element={<Favourites />}></Route>                
                <Route path='/genres' element={<Genres />}></Route>
                <Route path='/movie_details/:movieId' element={<MovieDetails />}></Route>
            </Routes>
            </MyContext.Provider>
            </FavContext.Provider>
        </div>
    )
}

export default App