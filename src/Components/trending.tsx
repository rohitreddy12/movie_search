import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './trending.css';
import { Button } from 'react-bootstrap';

interface Trending {
    id: number,
    poster_path: string,
    title: string,
    original_name?:string
}


function Trending() {

    const [trendingMovies, setTrendingMovies] = useState<Trending[]>([])
    const [show,setShow] = useState("movie")



    const getTrending = (show:string) => {
        fetch(`https://api.themoviedb.org/3/trending/${show}/day?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const moviesArr = data.results.map((item: Trending) => ({
                    id: item.id,
                    poster_path: item.poster_path,
                    title: item.title,
                    original_name:item.original_name
                }))
                setTrendingMovies(moviesArr)
            })
            .catch(err => console.error(err));
    }

    useEffect(
        () => {
            getTrending(show)
            console.log(trendingMovies)
        }, [show]
    )


    return (
        <div className='trendingMain'>
            <div className="trendingUpper">
                <p id='trendingTag'>Trending</p>
                <div className="switchButtons">
                    <Button id='movie' active={(show === 'movie')} onClick={() => setShow('movie')}>Movies</Button>
                    <Button id='tv' active={(show === 'tv')} onClick={() => setShow('tv')}>TV Shows</Button>
                </div>
            </div>
   
            <div className="trendingMovies">
                {
                    trendingMovies.map((item: Trending) =>
                        <div className='items'>
                            <Link to={`/movie_details/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} id={String(item.id)} key={String(item.id)} alt="Img Unavailable" />
                            </Link>
                            <div id='movieTitle'>{item.title}</div>
                            <div id='movieTitle'>{item.original_name}</div>
                        </div>

                    )
                }
            </div>

        </div>
    )
}

export default Trending