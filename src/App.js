
import { useEffect,useState} from "react";


function App() {

  const movie_details= (xy) =>{
    fetch("https://api.themoviedb.org/3/search/movie?query=${xy}&api_key=9e03485c60de4a3d6d15eace88f6e026")
    .then(Response => Response.json())
    .then(json => console.log(json))

  }

  const [inputText,setInputText]=useState("")

  useEffect( ()=>{
    movie_details(setInputText)
  },[]
 )

  return (
    <div className="App">
      <h1>WELCOME TO MOVIE SEARCH ENGINE</h1>
      <form>
        <label for="search">Enter the name of the movie</label>
        <input type="text" id="search" onChange={e => setInputText(e.target.value)} value={inputText} placeholder="Search..."></input>
      </form>
    </div>
    
    
  );

}

export default App;



