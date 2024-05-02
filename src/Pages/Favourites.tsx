import React, { useEffect, useState } from 'react'
import NavScrollExample from '../Components/navbar'
import './Favourites.css'



function Favourites() {

    // const [favPaths,setFavPaths]=useState([])

    let favResults:string[]=[]
    
    const storedFav = localStorage.getItem('fav')
    
    const storedResults=localStorage.getItem('results')

    if(storedFav && storedResults){
        
        let fav=JSON.parse(storedFav)
        let results=JSON.parse(storedResults)
        
        for(let i = 0;i<fav.length ; i++){
            results.map((det:any) => {
                if(det.id==fav[i]){
                    favResults.push(det.poster_path)
                }
            })
            
        }

    }

    // console.log(favPaths)    

    
    return (
        <div>
            <div><NavScrollExample /></div>
            <div id='favImg'>
                {favResults.map((path) =>
                    <div><img alt='Img is Loading' src={`https://image.tmdb.org/t/p/w500${path}`}></img></div>
                )} 
            </div> 
        </div>


    )
}

export default Favourites



// const favPaths:string[]=[]

    // if (storedFav && storedImgDet) {
    //     const imgDet = JSON.parse(storedImgDet)
    //     const fav = JSON.parse(storedFav)
    //     fav.map(
    //         (id:string) =>{
    //             imgDet.map(
    //                 (element:ImgDet) => {
    //                     if(id===element.id){
    //                         favPaths.push(element.poster_path)
    //                     }
    //                 }
    //             )
    //         }
    //     )
    // }