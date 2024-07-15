
import { Route, Routes } from 'react-router-dom'
import Favourites from './Pages/Favourites'
import Genres from './Pages/Genres'
import MovieDetails from './Pages/MovieDetails'
import MainPage from './Pages/MainPage'
import { useEffect, useState} from 'react'
import {MyContext} from './MyContext'
import NotFoundPage from './Pages/NotFoundPage'
import { getFav } from './Components/getFavourite'
import favouritesFetched  from './Store/actions'
import {store} from './Store/store'
import { Provider } from 'react-redux'
import NavBar from './Components/navbar'

function App() {

    const [mode, setmode] = useState('')

    const [isLoggedIn,setIsLoggedIn] = useState()

    const [style,setStyle] = useState({})

    const unsubscribe = store.subscribe(() => {
        const updatedMode = store.getState().mode.mode
        setmode(updatedMode)
    })
      
    const isSessionCreated = () => {
        let sessionId = localStorage.getItem('sessionId')
        return sessionId !== null && undefined ? true : false
    }

    
    const fetchData = async() => {
        const fetchFav = await getFav()
        store.dispatch(favouritesFetched(fetchFav))
    }
      
    useEffect(() => {
        fetchData()
    })

    
    // console.log('App.tsx is triggered')  
    
    
    // const [isLoggedIn,setIsLoggedIn] = useState(isSessionCreated()) 

    

    useEffect(() => {
        if(mode === 'dark'){
            setStyle(
                {
                    color:'white',
                    backgroundColor:'black',
                 
                }
            )
        }
        else{
            setStyle({})
        }
    },[mode])

    
    
    
    return (
        
        
        <div>
            {/* <Provider store={store}> */}

            
            {/* <MyContext.Provider value={{isLoggedIn ,setIsLoggedIn}}> */}
                <NavBar mode={mode} style={style} />
            <Routes>
                <Route path='*' element={<NotFoundPage />}></Route>
                <Route path='/' element={<MainPage />} ></Route>
                <Route path='/favourites' element={<Favourites />}></Route>                
                <Route path='/genres' element={<Genres />}></Route>
                <Route path='/movie_details/:movieId' element={<MovieDetails />}></Route>
            </Routes>
            {/* </MyContext.Provider> */}
            {/* </Provider> */}
        </div>
    )
}

export default App