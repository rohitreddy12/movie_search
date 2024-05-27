import React, { useContext, useEffect, useState } from 'react'
import { IoMdHeart } from 'react-icons/io'
import { MdFavoriteBorder } from 'react-icons/md'
import { removeFavourite } from './removeFavourite'
import { addFavourite } from './addFavourite'
import { FavContext, MyContext } from '../MyContext'



interface Props {
    imgId: string
    favIds: string[]
    setFavIds ?: React.Dispatch<React.SetStateAction<string[]>>
}

function FavouriteIcons(props: Props) {

    const {isLoggedIn} = useContext(MyContext)
   
    const handleClick = (id: string) => {
        if(isLoggedIn){
            if(props.favIds !== null && props.favIds.includes(props.imgId)){
                if(props.setFavIds)props.setFavIds(props.favIds.filter((item) => item!==id))
                removeFavourite(Number(props.imgId))
            }
            else{
                if(props.setFavIds)props.setFavIds([...props.favIds, props.imgId]);
                addFavourite(Number(props.imgId));
                // <Alert variant='light'>Added to favourites!</Alert>  
            }
        }
        else{
             
        }
        }
    
      
    //   console.log(favIds)

    // localStorage.setItem('favIds', JSON.stringify(favIds))


    
    return (
        <div className="main">
            
            {
                (props.favIds.includes(props.imgId)) ?
                    <div className='favIcon' ><button id={props.imgId} onClick={() => handleClick(props.imgId)}><IoMdHeart /></button></div> :
                    <div className='favIcon' ><button id={props.imgId} onClick={() => handleClick(props.imgId)}><MdFavoriteBorder /></button></div>
            }
            

        </div>
    )
}

export default FavouriteIcons