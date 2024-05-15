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
import { useSearchParams } from 'react-router-dom';




interface ImgDetails {
  id:string,
  poster_path: string
}

interface Fav{
  id:string
}

const App = () => {

  const [search, setSearch] = useState<string>('')
  // const [searchParams,setSearchParams] = useSearchParams({query:''})
  const [imgDet, setImgDet] = useState<ImgDetails[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalpages] = useState<number>(1)
  const [favIds,setFavIds] = useState<number[]>([])
  const [Favourites,setFavourites] = useState<number[]>([])

  const handleEvent: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value)
    // setSearchParams({query :event.target.value})
  }

  
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

  const getFav = () => {
    const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
      }
  };
      fetch('https://api.themoviedb.org/3/account/21190820/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
          .then((response) => response.json())
          .then(data => {
            const fav = data.results.map((item:Fav) => item.id)
            setFavIds(fav)
          }  
        )  
  
}

  const handleClick = (id:number) => {
    const fav = (localStorage.getItem('favIds'))
    
    if(fav !==null){
      const favItems = JSON.parse(fav)
      if (favItems.includes(id)) {
        setFavIds(favIds.filter((item) => item!==id));
        removeFavourite(id);
        
      }
      else {
        setFavIds([...favIds,id]);
        addFavourite(id);
        // <Alert variant='light'>Added to favourites!</Alert>  
     }
    }
    
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

  useEffect(
    () => {
      getFav();
    },[]
  )

  localStorage.setItem('favIds',JSON.stringify(favIds))

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
        { (search.length !==0) && <p id='searchHeading'>Search Results for '{search}'</p>}
        <div className="imgbody">
          {((imgDet.length ==0) && search.length>3) && <p id='noMovies'>Oops!Seems like there are no movies with the entered keyword</p>  }
          {imgDet.map((img) =>          
              <div className='img'>
                <Link to={`movie_details/${img.id}`}>
                  <img id={img.id} key={img.id} alt='Image is loading' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
                </Link>
                {(favIds.includes(Number(img.id))) ? 
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