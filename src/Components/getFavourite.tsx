

    // const {setFavIds} = useContext(FavContext)

import { Fav } from "../interfaces";

    // const [favIds, setFavIds] = useState<string[]>([])
export const getFav = async()=> {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`
            }
        };
        const response = await fetch('https://api.themoviedb.org/3/account/21190820/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
        const data = await response.json()
        const results:Fav[] = await data.results.map((item: Fav) => ({
            id:item.id,
            title:item.title,
            poster_path:item.poster_path
        })
    )

        return results
    }


    
    
    
   


