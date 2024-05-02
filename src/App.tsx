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






interface ImgDetails {
  id: string,
  poster_path: string,
}

const App = () => {

  const [search, setSearch] = useState<string>('')
  const [imgDet, setImgDet] = useState<ImgDetails[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalpages] = useState<number>(1)
  const [isFavourited,setIsFavourited] = useState<boolean>()
  // const [isFetching,setIsFetching] = useState<boolean>(false)
  const favourites: string[] = []
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

  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const btnId = event.currentTarget.id;
    if (favourites.includes(btnId)) {
      setIsFavourited(false)
      const index = favourites.indexOf(btnId)
      favourites.splice(index, 1) 
      localStorage.setItem('fav',JSON.stringify(favourites))
      console.log(favourites) 
      console.log(isFavourited)
    }
    else {
      favourites.push(btnId)
      setIsFavourited(true)
      console.log(favourites) 
      localStorage.setItem('fav',JSON.stringify(favourites))
      console.log(isFavourited)
    }
    
  }

  
  console.log(favourites)
  
  // useEffect(
  //   () =>{
  //     localStorage.setItem('fav',JSON.stringify(favourites))
  //   },[favourites]
  // )

  



  const apiCall = (movie: string, currentPage: number) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=9e03485c60de4a3d6d15eace88f6e026&page=${currentPage}`)
      .then(response => response.json())
      .then((data):void => {
        setTotalpages(data.total_pages)
        localStorage.setItem('results',JSON.stringify(data.results))
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
      <div className="mainimg">
        <div className="upper">
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
          <div>
            <div className='img'>
              <Link to={`movie-details/${img.id}`}>
                <img id={img.id} key={img.id} alt='Image is loading' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
              </Link><br />
              <div className='favicon' style={{ color: isFavourited ? 'red' : 'black', fontSize: '20px' }}><button id={img.id} onClick={handleClick}><MdFavoriteBorder /></button></div>
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