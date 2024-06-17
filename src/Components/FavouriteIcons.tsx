import React, { useContext, useEffect, useState } from 'react'
import { IoMdHeart } from 'react-icons/io'
import { MdFavoriteBorder } from 'react-icons/md'
import { removeFavourite } from './removeFavourite'
import { addFavourite } from './addFavourite'
import {MyContext } from '../MyContext'
import { store } from '../Store/store'
import { Fav, stateType } from '../interfaces'
import { favouriteAdded, favouriteRemoved } from '../Store/actions'
import { useSelector } from 'react-redux'
import { RootState } from '../Store/reducer'
import { createSelector } from '@reduxjs/toolkit'



interface Props {
    imgId: string
    poster_path:string,
    title:string
}

function FavouriteIcons(props: Props) {

    const {isLoggedIn} = useContext(MyContext)

    
    // const favouriteIds = useSelector((state:RootState) => state.favourites.favourites.map((item:Fav) => item.id)) --> This caused unnecessary re-renders
    
    //createSelector for memoizing the selector(used this after getting a warning!)
    const favidsSelector = createSelector(
        (state:RootState) => state.favourites.favourites,
        favourites => favourites.map((item:Fav) => item.id)
    )
    const favouriteIds = useSelector(favidsSelector)

   
   
    const handleClick = (id: string) => {
        if(isLoggedIn){
            if(favouriteIds !== null && favouriteIds.includes(id))  
                {
                    store.dispatch(favouriteRemoved(id))
                    removeFavourite(Number(id))
                }
            else{
                    store.dispatch(favouriteAdded({id:props.imgId,poster_path:props.poster_path,title:props.title}))
                    addFavourite(Number(id));
                }
        }
        }
    
    
    return (
        <div className="main">
            
            {
                (favouriteIds.includes(props.imgId)) ?
                    
                    <div className='favIcon' ><button id={props.imgId} onClick={() => handleClick(props.imgId)}><IoMdHeart /></button></div> :
                    <div className='favIcon' ><button id={props.imgId} onClick={() => handleClick(props.imgId)}><MdFavoriteBorder /></button></div>
            }
            

        </div>
    )
}

export default FavouriteIcons