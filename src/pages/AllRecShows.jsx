import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

export const AllRecShows = () => {
  const { id } = useParams();
  const [movieTitle, setMovieTitle] = useState();
  const [movieRec, setMovieRec] = useState([]);

  useEffect(() => {
    const movieInfoUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(movieInfoUrl).then((response) => {
      console.log(response.data);
      setMovieTitle(response.data);
    });
    const movieRecommendedUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieRecommendedUrl).then((response) => {
      //console.log("Rec", response.data);
      setMovieRec(response.data);
    });
  }, []);
  return (
    <div className="container">
      {movieTitle != null ? (
        <h2 className="detail" style={{ marginTop: 70 }}>
          Recommended for{" "}
          <span style={{ color: "rgb(240, 170, 35)" }}>
            {movieTitle.original_name}
          </span>
        </h2>
      ) : (
        <></>
      )}

      <div className="movies-container wrapper" style={{ paddingTop: 0 }}>
        {movieRec != 0 ? (
          movieRec.results.map((movie, index) => {
            if (movieRec.results[index].poster_path != null) {
              return (
                <NavLink className="navlink" to={`/show/${movie.id}`}>
                  <div className="movie-card pointer" style={{ marginTop: 50 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt="image"
                    />
                    <h3 className="movie-title">{movie.name}</h3>
                    <p className="movie-date">
                        {movie.first_air_date.charAt(8) != "0"
                          ? movie.first_air_date.substring(8, 10)
                          : movie.first_air_date.substring(9, 10)}{" "}
                        {movie.first_air_date.substring(5, 7) == "01" ? (
                          <span>January,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "02" ? (
                          <span>February,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "03" ? (
                          <span>March,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "04" ? (
                          <span>April,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "05" ? (
                          <span>May,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "06" ? (
                          <span>June,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "07" ? (
                          <span>July,</span>
                        ) : (
                          <></>
                        )}
                        {""}
                        {movie.first_air_date.substring(5, 7) == "08" ? (
                          <span>August,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "09" ? (
                          <span>September,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "10" ? (
                          <span>October,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "11" ? (
                          <span>November,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.first_air_date.substring(5, 7) == "12" ? (
                          <span>December,</span>
                        ) : (
                          <></>
                        )}
                        {""}
                        {movie.first_air_date.substring(0, 4)}
                      </p>
                  </div>
                </NavLink>
              );
            }
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
