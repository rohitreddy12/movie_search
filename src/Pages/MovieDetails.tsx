import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './MovieDetails.css'
import Badge from 'react-bootstrap/Badge';
import NavBar from '../Components/navbar';

interface MovieDet {
    title: string,
    genres: [],
    overview: string,
    poster_path: string,
    release_date: string,
    status: string,
    production_house: string,
    runtime: number,
    rating: number,
}

interface Cast{
    name:string,
    profile_path:string
}

interface WatchPro{
    logo_path:string,
    provider_name:string
}

function MovieDetails() {

    const [movieDetails, setMovieDetails] = useState<MovieDet>()
    const [castDetails, setCastDetails] = useState<Cast[]>([])
    const [rentWatchProviders,setRentWatchProviders] = useState<WatchPro[]>([])
    const [buyWatchProviders,setBuyWatchProviders] = useState<WatchPro[]>([])

    const params = useParams()

    const movieId = params.movieId



    const getMovieDetails = (id: string) => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=07c7b7634714bd11358f8eb30fff7102`)
            .then(response => response.json())
            .then((data) => {
                const details: MovieDet = {
                    title: data.title,
                    genres: data.genres.map((genre: any) => genre.name),
                    overview: data.overview,
                    poster_path: data.poster_path,
                    release_date: data.release_date,
                    status: data.status,
                    production_house: data.production_companies[0].name,
                    runtime: data.runtime,
                    rating: data.vote_average
                }
                setMovieDetails(details)
            })
    }

    const getCast = (id:string) => {
        fetch(`https://api.themoviedb.org/3/movie/${ id}/credits?api_key=07c7b7634714bd11358f8eb30fff7102`)
            .then(response => response.json())
            .then((data) => {
                const cast:Cast[] = data.cast.map((item:Cast) => ({
                    name:item.name,
                    profile_path:item.profile_path
                }))
                setCastDetails(cast)
            })
    }

    const getMovieProviders = (id:string) => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=07c7b7634714bd11358f8eb30fff7102`)
            .then(response => response.json())
            .then((data) => {
                const rentWatch:WatchPro[] = data.results.IN.rent.map((item:WatchPro) => ({
                    logo_path:item.logo_path,
                    provider_name:item.provider_name}))
                const buyWatch:WatchPro[] = data.results.IN.rent.map((item:WatchPro) => ({
                    logo_path:item.logo_path,
                    provider_name:item.provider_name
                }))
                setRentWatchProviders(rentWatch)
                setBuyWatchProviders(buyWatch)
            })
            .catch(err => console.log(err))
    }


    useEffect(
        () => {
            if (typeof (movieId) !== 'undefined') {
                getMovieDetails(movieId)
                getCast(movieId)
                getMovieProviders(movieId)
                console.log(rentWatchProviders)
                console.log(buyWatchProviders)
            }
        }, []
    )



    return (
        <div>
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
                                <div id="plot">The Plot</div>
                                <div id="plotline">{movieDetails.overview}</div>
                                <div id="cast">
                                    <p id='plot'>The Cast</p>
                                    <div className="castImgs">
                                        {
                                            castDetails.map((item) => 
                                                <div>
                                                    <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="Img is loading" />
                                                    <p id='name'>{item.name}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div id="watchOptions">
                                    <p id='plot'>Watch Options</p>
                                    <p>Buy</p>
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