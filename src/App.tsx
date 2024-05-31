
import { Route, Routes } from 'react-router-dom'
import Favourites from './Pages/Favourites'
import Genres from './Pages/Genres'
import MovieDetails from './Pages/MovieDetails'
import NavBar from './Components/navbar'
import MainPage from './Pages/MainPage'
import { useEffect, useState} from 'react'
import {MyContext} from './MyContext'
import NotFoundPage from './Pages/NotFoundPage'

function App() {
      
    const isSessionCreated = () => {
        let sessionId = localStorage.getItem('sessionId')
        return sessionId !== null ? true : false
    }

    const [isLoggedIn,setIsLoggedIn] = useState(isSessionCreated())
    

    return (
        
        
        <div>
            
            <MyContext.Provider value={{isLoggedIn ,setIsLoggedIn}}>
                <NavBar />
            <Routes>
                <Route path='*' element={<NotFoundPage />}></Route>
                <Route path='/' element={<MainPage />} ></Route>
                <Route path='/favourites' element={<Favourites />}></Route>                
                <Route path='/genres' element={<Genres />}></Route>
                <Route path='/movie_details/:movieId' element={<MovieDetails />}></Route>
            </Routes>
            </MyContext.Provider>
            
        </div>
    )
}

export default App