import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { useDebounce } from './useDebouce';
import Pagin from './Pagination';
import { PageSearch } from './PageSearch';
import NavScrollExample from './navbar';
import { SpinnerExample } from './Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';




interface ImgDetails {
  id: string,
  poster_path: string,
}

const App = () => {

  const [search, setSearch] = useState<string>('')
  const [imgDet, setImgDet] = useState<ImgDetails[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalpages] = useState<number>(1)
  const [isFetching,setIsFetching] = useState<boolean>(false)
  // const [buttonState, setButtonState] = useState<boolean>(false)


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
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=9e03485c60de4a3d6d15eace88f6e026&page=${currentPage}`)
      .then(response => response.json())
      .then((data) => {
        setTotalpages(data.total_pages)
        // setTotalResults(data.total_results)
        const imgParse: ImgDetails[] = data.results.map(
          (img: ImgDetails) => ({
            id: img.id,
            poster_path: img.poster_path,
          })
        )
        setImgDet(imgParse)
    
      })
  }



  const debouncedValue = useDebounce(search, 700)

  useEffect(
    () => {
      if (search.length >= 3) {
        setIsFetching(false)
        apiCall(debouncedValue, currentPage)
        setIsFetching(true)
      }
      else {
        setImgDet([])
        setIsFetching(false)
      }
      
    }, [debouncedValue, currentPage]
  )

  const btnClick = (e: number) => {
    setCurrentPage(e)
  }



  return (

    <div className='main'>
      <NavScrollExample />
      <div className="mainimg">
        <div className="upper">
          {/* <div className="header1">
            <div id='ms1'>Welcome to Filmy Lens</div>
          </div> */}
          <div className="search">
            <div id='st'>Search for a movie you're looking for</div>
            <input id="searchbar" type='text' onChange={handleEvent} value={search}></input>
          </div>
          <div className='header2'>
            <div className="first"><span id="s1">ALL MOVIES</span><span id='dot'>. </span></div>
            <div className="second"><span id='s2'>AT ONE PLACE</span><span id='dot'>.</span></div>
          </div>
          <div className='line'>
            <div>Discover the perfect movie in seconds.</div><span>From intense thrillers to light-hearted comedies,we have it all.</span><span id="se">Start Exploring.</span>
          </div>


        </div>
      </div>

      <div className="imgbody">
        {imgDet.map((img) =>
          <img id={img.id} key={img.id} alt='Image is loading' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
        )}
      </div>

      <div className='pagination'>
        <div id='bar'>{imgDet.length > 0 &&
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
export default App;