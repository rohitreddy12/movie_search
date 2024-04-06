import { useEffect, useState } from "react";

function App(){

  const [search,setSearch]=useState("")


  useEffect(() => {
    if(search.length>=3){
      fetch(``)
      .then(response => response.json())
      .then(data => console.log(data))
    } 
  },[search])


  return(
    <div>
      <h1>Welcome to Movie Search</h1>
      <input type="text" placeholder="Search..." onChange={e=>{setSearch(e.target.value)}} value={search}></input>
    </div>
    
  )

}


export default App;


