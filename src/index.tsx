import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import Favourites from './Pages/Favourites';
import MovieDetails from './Pages/MovieDetails';
import Login from './Components/Login';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/:movieId' element={<MovieDetails />}></Route>
            <Route path='/favourites' element={<Favourites />}></Route>
            
            
          </Routes>
        </BrowserRouter>



);


