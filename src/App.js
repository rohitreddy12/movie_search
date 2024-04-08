import { useEffect, useState } from "react";

function App(){

  const [search,setSearch]=useState("")
  const [imgList,setImgList]=useState([])
 

  function apiCall(movie){
    if(search.length>=3){
      fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=9e03485c60de4a3d6d15eace88f6e026`)
      .then(response => response.json())
      .then(data => {
        const imgDetails=data.results.map(img => ({
          id:img.id,
          poster_path:img.poster_path
        }))
        setImgList(imgDetails)
      })     
    }
  }

  useEffect(() => {
    apiCall(search) 
  },[search])

  
 //console.log(imgList)


  return(
    <div>
      <h1>Welcome to Movie Search</h1>
      <input type="text" placeholder="Search..." onChange={e=>{setSearch(e.target.value)}} value={search}></input> 
      <div className="images">
      {imgList.map((img) => 
        <img id={img.id} src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
      )}
      </div>    
    </div>
  )

}


export default App;


