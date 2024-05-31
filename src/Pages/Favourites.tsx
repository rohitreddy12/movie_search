
import { useContext, useEffect, useState } from 'react';
import './Favourites.css';
import { Link } from 'react-router-dom';
import Login from '../Components/Login';
import {  MyContext } from '../MyContext';
import FavouriteIcons from '../Components/FavouriteIcons';



interface Details {
    poster_path: string,
    title: string,
    id: string
}

function Favourites() {

    const { isLoggedIn} = useContext(MyContext)

    const [favItems, setFavItems] = useState<Details[]>([])

    const [show, setShow] = useState<boolean>(false)

    const handleClose = () => setShow(false);

    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
        }
      };

    const favourtiesList = () => {
        fetch('https://api.themoviedb.org/3/account/21190820/favorite/movies?language=en-US&page=1&sort_by=created_at.asc',options)
            .then((response) => response.json())
            .then((data): void => {
                const imgParse: Details[] = data.results.map((item: Details) => ({
                    poster_path: item.poster_path,
                    title: item.title,
                    id: item.id

                }))
            setFavItems(imgParse)
            })
    }

    console.log(favItems)

    useEffect(() => {
        if(isLoggedIn){
            favourtiesList()
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

                {favItems.map((item) =>

                    <div>
                        {
                            isLoggedIn &&
                            <div className='group'>
                                <Link to={`/movie_details/${item.id}`}>
                                <img id={item.id} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt='Image' />
                                </Link>
                                <div className='title'>{item.title}</div>
                                <FavouriteIcons imgId={item.id} favIds={favItems.map((item) => item.id)} />
                            </div>
                        }
                    </div>


                )}
            </div>
            <Login show={show} handleClose={handleClose}  />
        </div>


    )
}

export default Favourites



