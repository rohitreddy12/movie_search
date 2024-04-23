import React,{ FC, useEffect } from 'react';
import {useState} from 'react';
import './App.css'; 
import { useDebounce } from './useDebouce'  



interface ImgDetails{
  id:string,
  poster_path:string,
}

const App:FC= () => {

  const [search,setSearch] = useState<string>('')
  const [imgDet,setImgDet]=useState<ImgDetails[]>([])
  const [currentPage,setCurrentPage]=useState<number>(1)
  const [totalPages,setTotalpages]=useState<number>(1)
  const [buttonState,setButtonState]=useState<boolean>(false)

  
  const handleEvent:React.ChangeEventHandler<HTMLInputElement>= (event) => {
    setSearch(event.target.value)
  }


  const apiCall=(movie:string,currentPage:number) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=9e03485c60de4a3d6d15eace88f6e026&page=${currentPage}`)
    .then(response => response.json())
    .then((data) => {
      setTotalpages(data.total_pages)
      // setTotalResults(data.total_results)
      const imgParse:ImgDetails[]=data.results.map(
        (img:ImgDetails) => ({
          id:img.id,
          poster_path:img.poster_path, 
        })
      )
      setImgDet(imgParse)
    } )
  }
  
  const changeBtn=() => {
    if(imgDet.length>0 && search.length>=3){
    setButtonState(true)  
    }
  }


  const next=() => {
      if(currentPage < totalPages) setCurrentPage(currentPage+1)
    }

  const previous=() => {
    if(currentPage>1) setCurrentPage(currentPage-1)
  }
  
  
  const debouncedValue=useDebounce(search,700)

  useEffect(
    () => {
      if(search.length>=3){
        apiCall(debouncedValue,currentPage)  
      }
      else{
        setImgDet([])
      }
   },[debouncedValue,currentPage]
  )

  useEffect(
    () => {changeBtn()},[imgDet,search.length]
  )

  
  function createButton(value:number){
    const btnChange =(e:number) => {setCurrentPage(e)}
    const btnArray=[]
    for(let i=1;i<=value;i++){
        btnArray.push(<button key={i} onClick={()=>btnChange(i)} className={`button${i}`}>{i}</button>)
    }
    return btnArray
}

  
  return(

  <div className='main'>
    <div className="upper">
      <div className="header1">
        <h1><span>Welcome to </span><span id="ms">Movie Search</span></h1><br></br>
      </div>
      <div className='header2'>
        <h1><span id="s1">ALL MOVIES</span><span id='dot'>. </span><span id='s1'>AT ONE PLACE</span><span id='dot'>.</span> </h1>
      </div>

      <div className="search">
        <div>Search for a movie you're looking for</div> 
        <input id="searchbar" type='text' placeholder='Enter a min of 3 letters' onChange={handleEvent} value={search}></input>
      </div>

    </div>
     
    <div className="imgbody">
      {imgDet.map((img) => 
        <img id={img.id} key={img.id} alt='Image is loading' src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}></img>
      )}  
    </div>

    {buttonState &&
      <div className="buttons">
        <div className="pages">
            <button onClick={previous}>Previous</button>  
            <div className="numButtons">{createButton(totalPages)}</div>
            <button onClick={next}>Next</button>
        </div> 
      </div>
    }
         
  </div>
  )
}
export default App;