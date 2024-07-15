
import { useContext, useEffect, useState } from 'react';
import './Favourites.css';
import { Link } from 'react-router-dom';
import Login from '../Components/Login';
import {  MyContext } from '../MyContext';
import FavouriteIcons from '../Components/FavouriteIcons';
import { store } from '../Store/store';
import { Fav } from '../interfaces';
import { useSelector } from 'react-redux';
import { stateType } from '../interfaces';
import { RootState } from '../Store/reducer';



interface Details {
    poster_path: string,
    title: string,
    id: string
}

function Favourites() {
    
    // const { isLoggedIn} = useContext(MyContext)
    const [show, setShow] = useState<boolean>(false)

    const isLoggedIn = useSelector((store:RootState) => store.userLogin.isLoggedin)

    const handleClose = () => setShow(false);

    let favItems = useSelector((state:RootState) => state.favourites.favourites)

    useEffect(() => {
        if(isLoggedIn){
            setShow(false)        
        }
        else{
            setShow(true)
        }
    }, [isLoggedIn])

    

    return (
        <div className='main'>
            <div id='heading'>Favourited Movies</div>
            <div className="favImgs">
                {
                    !isLoggedIn && <div id='loginMsg'>You must login to view your favourites!!!</div>
                }

                {
                    (isLoggedIn && favItems.length === 0)  &&

                    <div className='noFavText'>You have not favourited any movie yet!</div>            
                }

                {   
                    (isLoggedIn) &&
                    favItems.map((item:Fav) =>
                    <div>
                        {
                            <div className='group'>
                                <Link to={`/movie_details/${item.id}`}>
                                <img id={item.id} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt='Image' />
                                </Link>
                                <div className='title'>{item.title}</div>
                                <FavouriteIcons imgId={item.id} poster_path={item.poster_path} title={item.title} />
                            </div>  
                        }                       
                    </div>
                )
                }
            </div>
            <Login show={show} handleClose={handleClose}  />
        </div>


    )
}

export default Favourites



