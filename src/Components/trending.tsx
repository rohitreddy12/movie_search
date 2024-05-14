import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './trending.css';

interface Trending{
    id:number,
    poster_path:string
}
function Trending() {

    const[trendingMovies,setTrendingMovies] = useState<Trending[]>([])

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
        }
      };
      
      const getTrending = () => {
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json())
        .then(data => {
            const moviesArr = data.results.map((item:Trending) => ({
                id:item.id,
                poster_path:item.poster_path
            }) )
            setTrendingMovies(moviesArr)
        })
        .catch(err => console.error(err));
      } 
    
    useEffect(
        () => {
            getTrending()
        },[]
    )

    console.log(trendingMovies)
    return (
    <div className='trendingMain'>
        <p id='trendingTag'>Trending</p>
        <div className="trendingMovies">
            {
                trendingMovies.map((item:Trending) => 
                    <Link to={`/movie_details/${item.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} id={String(item.id)} key={String(item.id)}  alt="Img is loading" />
                    </Link>
                )
            }
        </div>
        
    </div>
  )
}

export default Trending