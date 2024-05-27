import { useContext, useEffect} from 'react'
import { FavContext } from '../MyContext'

interface Fav {
    id: string
}







    // const {setFavIds} = useContext(FavContext)

    // const [favIds, setFavIds] = useState<string[]>([])
export const getFav = async() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
            }
        };
        const response = await fetch('https://api.themoviedb.org/3/account/21190820/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
        const data = await response.json()
        const results = await data.results.map((item: Fav) => item.id) 

        return results
    }


    
    
    
    // localStorage.setItem('favIds', JSON.stringify(favIds))


