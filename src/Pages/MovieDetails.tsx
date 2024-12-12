import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import Badge from "react-bootstrap/Badge";

interface MovieDet {
  title: string;
  genres: [];
  overview: string;
  poster_path: string;
  release_date: string;
  status: string;
  // production_house: string,
  runtime: number;
  rating: number;
  backdrop_path: string;
}

interface Cast {
  name: string;
  profile_path: string;
}

interface Provider {
  logo_path: string;
}

interface StreamProvider {
  logo_path: string;
  provider_name: string;
}

function MovieDetails() {
    // const[movieId, setMovieId] = useState<string>()
    // const [params, setParams] = useState<string>()
  const [movieDetails, setMovieDetails] = useState<MovieDet>();
  const [castDetails, setCastDetails] = useState<Cast[]>([]);
  const [rentProviders, setRentProviders] = useState<StreamProvider[]>();
  const [streamProviders, setStreamProviders] = useState<StreamProvider[]>();
  const [buyProviders, setBuyProviders] = useState<StreamProvider[]>();
  const [adsProviders, setAdsProviders] = useState<StreamProvider[]>();

  let {movieId} = useParams();

  // useEffect(() => {
  //   setMovieId(value.movieId)
  // },[])

  const getMovieDetails = (id: string) => {
    try {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const details: MovieDet = {
            title: data.title,
            genres: data.genres.map((genre: any) => genre.name),
            overview: data.overview,
            poster_path: data.poster_path,
            release_date: data.release_date,
            status: data.status,
            runtime: data.runtime,
            rating: data.vote_average,
            backdrop_path: data.backdrop_path,
            // production_house: data.production_companies[0].name,
          };
          setMovieDetails(details);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getCast = (id: string) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const cast: Cast[] = data.cast.map((item: Cast) => ({
          name: item.name,
          profile_path: item.profile_path,
        }));
        setCastDetails(cast);
      });
  };

  const getMovieProviders = (id: string) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.IN) {
          if (data.results.IN.flatrate) {
            const results = data.results.IN.flatrate.map(
              (item: StreamProvider) => ({
                logo_path: item.logo_path,
                provider_name: item.provider_name,
              })
            );
            setStreamProviders(results);
          }
          if (data.results.IN.rent) {
            const results = data.results.IN.rent.map(
              (item: StreamProvider) => ({
                logo_path: item.logo_path,
                provider_name: item.provider_name,
              })
            );
            setRentProviders(results);
          }
          if (data.results.IN.buy) {
            const results = data.results.IN.buy.map((item: StreamProvider) => ({
              logo_path: item.logo_path,
              provider_name: item.provider_name,
            }));
            setBuyProviders(results);
          }
          if (data.results.IN.ads) {
            const results = data.results.IN.ads.map((item: StreamProvider) => ({
              logo_path: item.logo_path,
              provider_name: item.provider_name,
            }));
            setAdsProviders(results);
          }
        }
        // const rentWatch:WatchPro[] = data.results.IN.rent.map((item:WatchPro) => ({
        //     logo_path:item.logo_path,
        //     provider_name:item.provider_name}))
        // const buyWatch:WatchPro[] = data.results.IN.rent.map((item:WatchPro) => ({
        //     logo_path:item.logo_path,
        //     provider_name:item.provider_name
        // }))
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // setMovieId(movieParam)
    // console.log(movieId)
    if (movieId) {
      getMovieDetails(movieId);
      getCast(movieId);
      getMovieProviders(movieId);
    }
    else{
      console.log("oops")
    }
  }, []);

  return (
    <div>
      <div className="div">
        {!(movieDetails === undefined) && (
          <div className="mainDet">
            <div className="upperDet">
              {/* <FavouriteIcons imgId={''} favIds={[]} /> */}
              <div className="poster">
                {movieDetails.poster_path !== null ? (
                  <img
                    id="poster"
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt="Image not Available"
                  />
                ) : (
                  <div id="poster">Image Unavailable</div>
                )}
              </div>
              <div className="upperdetails">
                <div>
                  <span id="subh">Genre: </span>{" "}
                  {movieDetails.genres.join(" | ")}{" "}
                </div>
                <div>
                  <span id="subh">Release Date: </span>
                  {movieDetails.release_date}
                </div>
                {/* <div ><span id='subh'>Prodction House: </span>{movieDetails.production_house !== null ? movieDetails.production_house : 'Information Unavailable'}</div> */}
                <div>
                  <span id="subh">Runtime: </span>
                  {movieDetails.runtime} mins
                </div>
                <div>
                  <span id="subh">Rating: </span>
                  {movieDetails.rating}/10
                </div>
                <div id="status">
                  <span id="subh"></span>
                  <Badge bg="success">{movieDetails.status}</Badge>
                </div>
              </div>
            </div>
            <div id="title">{movieDetails.title}</div>

            <div className="moreDetails">
              <div id="plot">The Plot</div>
              <div id="plotline">{movieDetails.overview}</div>
              <div id="cast">
                <p id="plot">The Cast</p>
                <div className="castImgs">
                  {castDetails.map((item) => (
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                        alt="Image Not Found"
                      />
                      <p id="name">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div id="watchOptions">
                <p id="plot">Watch Options</p>
                <div className="stream">
                  <p id="streamTitle">Stream</p>
                  {streamProviders
                    ? streamProviders.map((item) => (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                          alt=""
                        />
                      ))
                    : "There are no Providers"}
                  <p id="streamTitle">Ads</p>
                  {adsProviders
                    ? adsProviders.map((item) => (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                          alt=""
                        />
                      ))
                    : "There are no Providers"}
                  <p id="streamTitle">Rent</p>
                  {rentProviders
                    ? rentProviders.map((item) => (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                          alt=""
                        />
                      ))
                    : "There are no Providers"}
                  <p id="streamTitle">Buy</p>
                  {buyProviders
                    ? buyProviders.map((item) => (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                          alt=""
                        />
                      ))
                    : "There are no Providers"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
