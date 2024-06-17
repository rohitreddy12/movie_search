import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './trending.css';

interface Trending {
    id: number,
    poster_path: string,
    title: string
}
function Trending() {

    const [trendingMovies, setTrendingMovies] = useState<Trending[]>([])


    const getTrending = () => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const moviesArr = data.results.map((item: Trending) => ({
                    id: item.id,
                    poster_path: item.poster_path,
                    title: item.title
                }))
                setTrendingMovies(moviesArr)
            })
            .catch(err => console.error(err));
    }

    useEffect(
        () => {
            getTrending()
        }, []
    )


    return (
        <div className='trendingMain'>
            <p id='trendingTag'>Trending</p>
            <div className="trendingMovies">
                {
                    trendingMovies.map((item: Trending) =>
                        <div className='items'>
                            <Link to={`/movie_details/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} id={String(item.id)} key={String(item.id)} alt="Img Unavailable" />
                            </Link>
                            <div id='movieTitle'>{item.title}</div>
                        </div>

                    )
                }
            </div>

        </div>
    )
}

export default Trending