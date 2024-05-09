
import { useEffect, useState } from 'react';
import NavBar from '../Components/navbar';
import './Favourites.css';
import { Card, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';


interface Details {
    poster_path: string,
    title: string,
    id: string
}

function Favourites() {

    const [favItems, setFavItems] = useState<Details[]>([])


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
        }
    };

    const favourtiesList = () => {
        fetch('https://api.themoviedb.org/3/account/21190820/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
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


    useEffect(() => {
        favourtiesList();
    }, [])


    return (
        <div>
            <NavBar />
            <div id='heading'>Favourited Movies</div>
            <div className="favImgs">
                {favItems.map((item) =>
                    <>
                        <Link to={`/movie_details/${item.id}`}>
                            <img id={item.id} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt='Image' />
                        </Link>
                    </>
                )}
            </div>
        </div>


    )
}

export default Favourites



