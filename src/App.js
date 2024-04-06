import { useEffect, useState } from "react";

function App(){

  const [search,setSearch]=useState("")

  function apiCall(movie){
    if(search.length>=3){
      fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=9e03485c60de4a3d6d15eace88f6e026`)
      .then(response => response.json())
      .then(data => console.log(data))
    } 
  }

  useEffect(() => {
    apiCall(search) 
  },[search])


  return(
    <div>
      <h1>Welcome to Movie Search</h1>
      <input type="text" placeholder="Search..." onChange={e=>{setSearch(e.target.value)}} value={search}></input> 
    </div>   
  )

}


export default App;


