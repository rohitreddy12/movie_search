import React, { useEffect, useState } from 'react'
import NavBar from '../Components/navbar'
import Button from 'react-bootstrap/Button';
import './genre.css'
import { Link } from 'react-router-dom';

interface Genre {
    id: number,
    name: string
}

interface GenreMovies {
    id: string,
    poster_path: string
}

function Genres() {

    const [active,setActive] =useState<number>()
    const [genreMoviesList, setGenreMoviesList] = useState<GenreMovies[]>([])
    const [genresList, setGenresList] = useState<Genre[]>([])
    const allGenres = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
            }
        };

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(response => response.json())
            .then(response => {
                setGenresList(response.genres)
            }
            )
            .catch(err => console.error(err));
    }

    useEffect(() => {
        allGenres()
    }, [])

    const genreMovies = (genreId: number) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
            }

        }
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=07c7b7634714bd11358f8eb30fff7102&with_genres=${genreId}`, options)
            .then(response => response.json())
            .then((data) => {
                const genreArr: GenreMovies[] = data.results.map((item: GenreMovies) => ({
                    id: item.id,
                    poster_path: item.poster_path
                })
                )
                setGenreMoviesList(genreArr)
            }
            )

    }

    const handleClick = (id: number) => {
        genreMovies(id)
        setActive(id)
    }

    

    

    return (
        <div className="mainPage">
            <NavBar />
            <div className='page'>

                <div className='genreButtons'>
                    {
                        genresList.map((elem) =>
                            <Button variant='outline-secondary' id={elem.name} onClick={() => handleClick(elem.id)}  active={active==elem.id}    >{elem.name}</Button>
                        )
                    }
                </div>
                <div className="genreResults">
                    {
                        genreMoviesList.map((elem) =>
                            <Link to={`/movie_details/${elem.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`} id={elem.id} key={elem.id} alt="Img is loading" />
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Genres