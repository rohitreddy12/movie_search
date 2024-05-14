import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { useDebounce } from './Components/useDebounce';
import Pagin from './Components/Pagination';
import { PageSearch } from './Components/PageSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import {addFavourite} from './Components/addFavourite';
import { removeFavourite } from './Components/removeFavourite';
import NavBar from './Components/navbar';
import Alert from 'react-bootstrap/Alert';
import Trending from './Components/trending';
import CarouselEx from './Components/carousel';




interface ImgDetails {
  id:string,
  poster_path: string
}

const App = () => {

  const [search, setSearch] = useState<string>('')
  const [imgDet, setImgDet] = useState<ImgDetails[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalpages] = useState<number>(1)
  const [Favourites,setFavourites] = useState<number[]>([])

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

  const handleClick = (id:number) => {
    if (Favourites.includes(id)) {
      setFavourites(Favourites.filter((item) => item!==id));
      removeFavourite(id);
      
    }
    else {
      setFavourites([...Favourites,id]);
      addFavourite(id);
      <Alert variant='light'>Added to favourites!</Alert>
   }
  console.log(Favourites)
  }


  

  const apiCall = (movie: string, currentPage: number) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=07c7b7634714bd11358f8eb30fff7102&page=${currentPage}`)
      .then(response => response.json())
      .then((data): void => {
        setTotalpages(data.total_pages)
        // localStorage.setItem('results', JSON.stringify(data.results))
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
      
      <NavBar />
      {/* {isLoginDisplayed && <Login />
      
      } */}
      <div className="mainimg">
          {/* <CarouselEx /> */}
          <div className="search">
            <div id="searchbar"><input type='text' placeholder='Search for a movie...' onChange={handleEvent} value={search}></input></div>
          </div>
          <div className='header2'>
            <div className="first" style={{color:"white"}}><span id="s1">ALL MOVIES</span><span id='dot'>. </span></div>
            <div className="second" style={{color:"white"}}><span id='s2'>AT ONE PLACE</span><span id='dot'>.</span></div>
          </div>
          <div className='line'>
            <span id="line1" style={{color:"white"}}>Discover the perfect movie in seconds.</span><br /><span id='line2' style={{color:"white"}}>From intense thrillers to light-hearted comedies,we have it all.</span><span id="se" style={{color:"white"}}>Start Exploring.</span>
          </div>
      </div>

      <div className="trending">
        <Trending />
      </div>

      <div className="searchTitle">
        { (search.length !==0) && <p>Search Results for '{search}'</p>}
        <div className="imgbody">
          {imgDet.map((img) =>          
              <div className='img'>
                <Link to={`movie_details/${img.id}`}>
                  <img id={img.id} key={img.id} alt='Image is loading' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
                </Link>
                {(Favourites.includes(Number(img.id))) ? 
                  <div className='favIcon' ><button id={img.id} onClick={() => handleClick(Number(img.id))}><IoMdHeart /></button></div> :
                  <div className='favIcon' ><button id={img.id} onClick={() => handleClick(Number(img.id))}><MdFavoriteBorder /></button></div>
                }
                
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
export default App;