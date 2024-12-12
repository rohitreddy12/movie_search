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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';



interface Props {
    imgId: string
    poster_path:string,
    title:string
}

function FavouriteIcons(props: Props) {

    // const {isLoggedIn} = useContext(MyContext)

    const isLoggedIn = useSelector((store:RootState) => store.userLogin.isLoggedin)

    
    // const favouriteIds = useSelector((state:RootState) => state.favourites.favourites.map((item:Fav) => item.id)) --> This caused unnecessary re-renders
    
    //createSelector for memoizing the selector(used this after getting a warning(causing re-renders)!)
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
        else{
            
        }
        }

        const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
            <Tooltip style={{backgroundColor:'grey'}}   {...props}>
              Unlock favorites with a login!
            </Tooltip>
          );
    
    
    return (
        <div className="main">
            
            {
                (isLoggedIn) ?
                (
                (favouriteIds.includes(props.imgId)) ?
                    
                    <div className='favIcon' ><button id={props.imgId} onClick={() => handleClick(props.imgId)}><IoMdHeart /></button></div> :
                    <div className='favIcon' ><button id={props.imgId} onClick={() => handleClick(props.imgId)}><MdFavoriteBorder /></button></div>
                )  :
                <OverlayTrigger
                    placement="auto"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                <div className='favIcon' ><button id={props.imgId} onClick={() => handleClick(props.imgId)}><MdFavoriteBorder /></button></div>
                </OverlayTrigger>
                
            }

            

        </div>
    )
}

export default FavouriteIcons