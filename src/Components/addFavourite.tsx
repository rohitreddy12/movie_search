import React from 'react'

export function addFavourite(props:number) {

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`
        },
        body: JSON.stringify({media_type: 'movie', media_id: props, favorite: true})
      };
      
    const addFav = () => {
        fetch('https://api.themoviedb.org/3/account/21190820/favorite', options)
    }

    addFav();
  
}

