import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { useDebounce } from './Components/useDebounce';
import Pagin from './Components/Pagination';
import { PageSearch } from './Components/PageSearch';
import NavScrollExample from './Components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import Login from './Components/Login';






interface ImgDetails {
  id: string,
  poster_path: string,
}

const App = () => {

  const [search, setSearch] = useState<string>('')
  const [imgDet, setImgDet] = useState<ImgDetails[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalpages] = useState<number>(1)
  const [isFavourited, setIsFavourited] = useState<boolean>()
  const [isLoginDisplayed, setIsLoginDisplayed] = useState<boolean>(false)
  let favourites: string[] = []

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

  const handleClick = (id: any) => {
    debugger
    if (favourites.includes(id)) {
      setIsFavourited(false)
      const index = favourites.indexOf(id)
      favourites.splice(index, 1)

      console.log(isFavourited)
    }
    else {
      favourites.push(id)
      setIsFavourited(true)
      console.log(isFavourited)

    }
    console.log(favourites)
    localStorage.setItem('fav', JSON.stringify(favourites))
  }


  const toggleDisplay = () => {
    setIsLoginDisplayed(!isLoginDisplayed)
  }




  const apiCall = (movie: string, currentPage: number) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=07c7b7634714bd11358f8eb30fff7102&page=${currentPage}`)
      .then(response => response.json())
      .then((data): void => {
        setTotalpages(data.total_pages)
        localStorage.setItem('results', JSON.stringify(data.results))
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
        apiCall(debouncedValue, currentPage)
      }
      else {
        setImgDet([])
      }

    }, [debouncedValue, currentPage]
  )

  const btnClick = (e: number) => {
    setCurrentPage(e)
  }



  return (
    <div className='main'>
      <NavScrollExample />
      {/* {isLoginDisplayed && <Login />
      
      } */}
      <div className="mainimg">
        <div className="upper">
          <div className="search">
            <div id="searchbar"><input type='text' placeholder='Search for a movie...' onChange={handleEvent} value={search}></input></div>
            <span className="material-symbols-outlined">
              search
            </span>
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
          <div>
            <div className='img'>
              <Link to={`movie-details/${img.id}`}>
                <img id={img.id} key={img.id} alt='Image is loading' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
              </Link><br />
              <div className='favicon' style={{ color: isFavourited ? 'red' : 'black', fontSize: '20px' }}><button id={img.id} onClick={() => handleClick(img.id)}><MdFavoriteBorder /></button></div>
            </div>
          </div>
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