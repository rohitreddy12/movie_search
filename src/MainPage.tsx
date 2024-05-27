import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import './MainPage.css';
import { useDebounce } from './Components/useDebounce';
import Pagin from './Components/Pagination';
import { PageSearch } from './Components/PageSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes } from 'react-router-dom';
import Trending from './Components/trending';
import { useSearchParams } from 'react-router-dom';
import FavouriteIcons from './Components/FavouriteIcons';
import {getFav} from './Components/getFavourite';




interface ImgDetails {
  id: string,
  poster_path: string
}


const MainPage = () => {

  

  const [search, setSearch] = useState<string>('')
  const [imgDet, setImgDet] = useState<ImgDetails[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalpages] = useState<number>(1)
  const [favIds,setFavIds] = useState<string[]>([])


  // const [searchParams, setSearchParams] = useSearchParams({q:''})
  let fav=[]


  const handleEvent: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value)
    // setSearchParams({ q: event.target.value })
  }

  // const updateFavIds = (elem:[]) => setFavIds(elem)


  // let query:any
  // if(searchParams.get('query')!==null){
  //   query = searchParams.get('query')
  // }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value !== undefined) {
      const newPage = parseInt(event.target.value)
      if (newPage > 0 && newPage < totalPages)
        setCurrentPage(newPage)
    }
  }


  const apiCall = (movie: string, currentPage: number) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=07c7b7634714bd11358f8eb30fff7102&page=${currentPage}`)
      .then(response => response.json())
      .then((data): void => {
        setTotalpages(data.total_pages)
        const imgParse: ImgDetails[] = data.results.map(
          (img: ImgDetails) => ({
            id: img.id,
            poster_path: img.poster_path
          })
        )

        setImgDet(imgParse)

      })
      .catch(err => console.log(err))
  }

  const fetchFav = async() => {
    fav = await getFav()
    setFavIds(fav)
  }


  const debouncedValue = useDebounce(search, 700)

  useEffect(
    () => {
      // const param = searchParams.get('q')
      if (search.length >= 3) {
          localStorage.setItem('q',debouncedValue)
          apiCall(debouncedValue, currentPage) 
         
      }

      else {
        setImgDet([])
      }
    }, [debouncedValue, currentPage]
  )

  useEffect(() => {
    fetchFav()
    let query = localStorage.getItem('q')
    if(query !== null)
      setSearch(query)
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
                <img id={img.id} key={img.id} alt='Image is loading' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
              </Link>
              <FavouriteIcons imgId={img.id} favIds={favIds} setFavIds={setFavIds}/>
      

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