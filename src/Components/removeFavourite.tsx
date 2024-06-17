import React from 'react'

export function  removeFavourite(props:number) {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`
        },
        body: JSON.stringify({media_type: 'movie', media_id: props, favorite: false})
      };
      
    const removeFav = () => {
        fetch('https://api.themoviedb.org/3/account/21190820/favorite', options)
        .catch(err => console.log(err))
    }

    removeFav();
}

