import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './MovieDetails.css'
import NavScrollExample from '../Components/navbar'
import Badge from 'react-bootstrap/Badge';

interface MovieDet {
    title: string,
    genres: [],
    overview: string,
    poster_path: string,
    release_date: string,
    status: string,
    production_house:string,
    runtime:number,
    rating:number,
}

function MovieDetails() {

    const [movieDetails, setMovieDetails] = useState<MovieDet>()
    const params = useParams()

    const movieId = params.movieId



    const apiCall = (id: string) => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9e03485c60de4a3d6d15eace88f6e026`)
            .then(response => response.json())
            .then((data) => {
                const details: MovieDet = {
                    title: data.original_title,
                    genres: data.genres.map((genre: any) => genre.name),
                    overview: data.overview,
                    poster_path: data.poster_path,
                    release_date: data.release_date,
                    status: data.status,
                    production_house:data.production_companies[0].name,
                    runtime:data.runtime,
                    rating:data.vote_average
                }
                setMovieDetails(details)
            })
    }


    useEffect(
        () => {
            if (typeof (movieId) === "string") {
                apiCall(movieId)
            }
        }, []
    )

    

    return (
        <div>
            <NavScrollExample />
            <div className="div">
                {
                    !(movieDetails === undefined) && (
                        <div id='mainDet'>
                            <div className='upperDet'> 
                                <div className="poster">
                                    <img id='poster' src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt="" />
                                </div>
                                <div className='upperdetails'>
                                    <div ><span id='subh'>Genre: </span> {movieDetails.genres.join(" | ")} </div>
                                    <div ><span id='subh'>Release Date: </span>{movieDetails.release_date}</div>
                                    <div ><span id='subh'>Prodction House: </span>{movieDetails.production_house}</div>
                                    <div ><span id='subh'>Runtime: </span>{movieDetails.runtime} mins</div>
                                    <div ><span id='subh'>Rating: </span>{movieDetails.rating}/10</div>
                                    <div id='status'><span id='subh'></span><Badge bg='success'>{movieDetails.status}</Badge></div>
                                </div>
                            </div>
                            <div id='title'>{movieDetails.title}</div>
                            <div>
                                <div> 
                                    <div id="plot">The Plot</div>
                                     <div id="plotline">{movieDetails.overview}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>

    )
}

export default MovieDetails