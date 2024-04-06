import { useEffect, useState } from "react";

function App(){

  const [search,setSearch]=useState("")

  
  // useEffect(() => {() => {}},[search])

  useEffect(() => {
    if(search.length>=3){
      fetch(``)
      .then(response => response.json())
      .then(data => console.log(data))
    } 
  },[])

  


  return(
    <div>
      <h1>Welcome to Movie Search</h1>
      <input type="text" placeholder="Search..." onChange={e=>{setSearch(e.target.value)}} value={search}></input>
    </div>
    
  )

}


export default App;


/*onChange is an event that is used to recognise and identify the change.when used in inout it identifies 
whenever a user enters a char*/
// .target is used to identify the change and .value is used to get the changed value

// useState and useEffect are ReactHooks
