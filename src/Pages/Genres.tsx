import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import './genre.css'
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import MovieCard from '../Components/MovieCard';

interface Genre {
    id: number,
    name: string
}

interface GenreMovies {
    id: string,
    poster_path: string
    title:string
}

interface MovieFilter{
    genre:number,
    filter:string
}

function Genres() {

    const [active, setActive] = useState<number>(28)
    const [genreMoviesList, setGenreMoviesList] = useState<GenreMovies[]>([])
    const [genresList, setGenresList] = useState<Genre[]>([])

    const [movieFilter,setMovieFilter] = useState<MovieFilter>({genre:28,filter:'vote_average.desc'})

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

    const genreMovies = (movieFilter:MovieFilter) => {
               
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=07c7b7634714bd11358f8eb30fff7102&with_genres=${movieFilter.genre}&sort_by=${movieFilter.filter}`)
            .then(response => response.json())
            .then((data) => {
                const genreArr: GenreMovies[] = data.results.map((item: GenreMovies) => ({
                    id: item.id,
                    poster_path: item.poster_path,
                    title:item.title
                })
                )
                setGenreMoviesList(genreArr)
            }
            )

    }

    const handleClick = (id: number) => {
        setMovieFilter({
            ...movieFilter,
            genre:id
        })
        setActive(id)
    }
    
    const handleChange:React.ChangeEventHandler<HTMLSelectElement>  = (event) => {
        setMovieFilter({
            ...movieFilter,
            filter:event.target.value
        })
    }

    useEffect(
        () => {genreMovies(movieFilter)},[movieFilter]
    )


    const btnCustom = {
        borderRadius: '20px'
    }

    return (
        <div className="genrePage">
            <div className='genreSideBar'>

                <div className="genreBox">
                    {/* <Dropdown.Toggle variant='outline-dark' id='sortbyButton'>Genres</Dropdown.Toggle>
                    <Dropdown.Menu id='dropdownFilters'>
                        <div className='genreButtons'>
                        {
                            genresList.map((elem) =>                           
                                <Button style={btnCustom} className='genrePill' size='sm' variant='outline-secondary' id={elem.name} onClick={() => handleClick(elem.id)} active={active == elem.id}>{elem.name}</Button>              
                            )
                        }   
                        </div>
                    </Dropdown.Menu> */}
                    <div className='genreTitle'>Genres</div>
                    <div className='genreButtons'>
                    {
                        genresList.map((elem) =>                           
                            <Button style={btnCustom} className='genrePill' size='sm' variant='outline-secondary' id={elem.name} onClick={() => handleClick(elem.id)} active={active == elem.id}>{elem.name}</Button>              
                        )
                    }   
                    </div>
                </div>

                <div className="sortFilter">
                    <Dropdown>
                        <Dropdown.Toggle variant='outline-dark' id='sortbyButton'>Sort</Dropdown.Toggle>
                        <Dropdown.Menu id='dropdownFilters'>
                            <Dropdown.Header id='dropdownHeaderTitle'>Sort Results By</Dropdown.Header>
                            <div className='selectBox'>
                                <select name='filters' id='filters' onChange={handleChange}>
                                    <option value='vote_average.desc'>Rating</option>
                                    <option value='popularity.desc'>Popularity</option>
                                    <option value='original_title.asc'>Title(A-Z)</option>
                                    <option value='primary_release_date.desc'>Release Date</option>
                                </select>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </div>
            <div className="genreResults">
                {
                    genreMoviesList.map((elem) =>
                        <Link to={`/movie_details/${elem.id}`}>
                            <MovieCard title={elem.title} poster_path={elem.poster_path} key={elem.title}/>
                           
                        </Link>
                    )
                }
            </div>
        </div>

    )
}

export default Genres