import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import './MainPage.css';
import {useDebounce}   from '../Hooks/useDebounce';
import Pagin from '../Components/Pagination';
import { PageSearch } from '../Components/PageSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes } from 'react-router-dom';
import Trending from '../Components/trending';
import FavouriteIcons from '../Components/FavouriteIcons';
import {getFav} from '../Components/getFavourite';
import { store } from '../Store/store';
import { Button } from 'react-bootstrap';




interface ImgDetails {
  id: string,
  poster_path: string
  title:string
}


const MainPage = () => {

  

  const [search, setSearch] = useState<string>('')
  const [imgDet, setImgDet] = useState<ImgDetails[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalpages] = useState<number>(1)



  


  const handleEvent: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value)
  }



  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value !== undefined) {
      const newPage = parseInt(event.target.value)
      if (newPage > 0 && newPage < totalPages)
        setCurrentPage(newPage)
    }
  }


  const apiCall = (movie: string, currentPage: number) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`)
      .then(response => response.json())
      .then((data): void => {
        setTotalpages(data.total_pages)
        const imgParse: ImgDetails[] = data.results.map(
          (img: ImgDetails) => ({
            id: img.id,
            poster_path: img.poster_path,
            title:img.title
          })
        )

        setImgDet(imgParse)

      })
      .catch(err => console.log(err))
  }

  const debouncedValue = useDebounce(search, 700)


  useEffect(
    () => {
      if (search.length >= 3) {
        sessionStorage.setItem('q',debouncedValue)
        apiCall(debouncedValue, currentPage) 
  }
      else {
        setImgDet([])
      }
    }, [debouncedValue, currentPage]
  )

  useEffect(() => {
    // fetchFav()
    let query = sessionStorage.getItem('q')
    if(query !== null)
      setSearch(query)
    // console.log(process.env.REACT_APP_API_KEY)
    console.log(store.getState())
  },[])

  
  const btnClick = (e: number) => {
    setCurrentPage(e)
  }

  
  return (
    <div className='main'>
      <div className="mainimg">
        {/* <CarouselEx /> */}
        <div className='header2'>
          <div className="first" style={{ color: "white" }}><span id="s1">ALL MOVIES</span><span id='dot'>. </span></div>
          <div className="second" style={{ color: "white" }}><span id='s2'>AT ONE PLACE</span><span id='dot'>.</span></div>
        </div>
        <div className='line'>
          <span id="line1" style={{ color: "white" }}>Discover the perfect movie in seconds.</span><br /><span id='line2' style={{ color: "white" }}>From intense thrillers to light-hearted comedies,we have it all.</span><span id="se" style={{ color: "white" }}>Start Exploring.</span>
        </div>
        <div className="search">
          <div id="searchbar"><input type='text' placeholder='Search for a movie...' onChange={handleEvent} value={search}></input></div>
        </div>
      </div>

      <div className="trending">
        
        <Trending />
        
      </div>

      <div className="searchTitle">
        {(search.length !== 0) && <p id='searchHeading'>Search Results for '{search}'</p>}
        <div className="imgbody">
          {((imgDet.length == 0) && search.length > 3) && <p id='noMovies'>Oops!Seems like there are no movies with the entered keyword</p>}
          {imgDet.map((img) =>
            <div className='img'>
              <Link to={`movie_details/${img.id}`}>
                <img id={img.id} key={img.id} alt='Image Unavailable' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
              </Link>
              <div className="overlayTitle">{img.title}</div>
              <FavouriteIcons imgId={img.id} poster_path={img.poster_path} title={img.title} />
            </div>
          )}
        </div>
      </div>

      <div className='pagination'>
        <div id='bar'>
          {imgDet.length > 0 &&
            <div><Pagin total_pages={totalPages} curr={currentPage} btnclick={btnClick} /></div>
          }
        </div>
        <div id="searchbox">
          {imgDet.length > 0 &&
            <div><PageSearch totalPages={totalPages} handleEvent={handleChange} /></div>
          }
        </div>
      </div>

    </div>

  )
}
export default MainPage;