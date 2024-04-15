import React, { useEffect } from 'react';
import {useState} from 'react';
import './App.css';

interface ImgDetails{
  id:string,
  poster_path:string
}

const App:React.FC = () => {

  const [search,setSearch] = useState<string>('')
  const [imgDet,setImgDet]=useState<ImgDetails[]>([])

  const handleEvent:React.ChangeEventHandler<HTMLInputElement>= (event) => {
    setSearch(event.target.value)
  }


  const apiCall=(movie:string) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=9e03485c60de4a3d6d15eace88f6e026`)
    .then(response => response.json())
    .then(data => {
      const imgParse:ImgDetails[]=data.results.map(
        (img:ImgDetails) => ({
          id:img.id,
          poster_path:img.poster_path
        })
      )
      setImgDet(imgParse)
    } )
  }

  // console.log(typeof(imgDet))

  useEffect(
    () => {
      if(search.length>=3){
        apiCall(search)
      }
   },[search]
  )

  return(
    <div className='main'>
      <h1>Welcome</h1>
      <input id="searchbar" type='text' placeholder='Enter a min of 3 letters' onChange={handleEvent} value={search}></input>
      <div className="imgs">
        {imgDet.map((img) => 
          <img id={img.id} key={img.id} alt='Image is loading' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
        )}  
      </div> 
    </div>
  )
}

export default App;
