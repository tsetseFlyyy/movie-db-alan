import { useParams } from "react-router-dom";
import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const SearchedResultsPage = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchMoviesURL = `https://api.themoviedb.org/3/search/multi?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US&query=${id}&page=1&include_adult=false`;
    axios.get(searchMoviesURL).then((response) => {
      //console.log("Movies", response.data.results);
      setResults(response.data.results);
      //console.log(response.data.results[0].name.includes(id));
    });
  }, []);

  if (results.length > 0) {
    if (
      results[0].name != undefined &&
      results[0].name.toLowerCase().includes(id.toLowerCase())
    ) {
    } else {
      console.log("!!!!!");
      const searchMoviesURL = `https://api.themoviedb.org/3/search/multi?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US&query=${id}&page=1&include_adult=false`;
      axios.get(searchMoviesURL).then((response) => {
        //console.log("Movies", response.data.results);
        setResults(response.data.results);
        //console.log(response.data.results[0].name.includes(id));
      });
    }
  }

  return (
    <div className="container">
      <h2 className="detail" style={{ marginTop: "70px" }}>
        Results for <span className="orange-name">{id}</span>
      </h2>
      <div
        className="movies-container wrapper"
        style={{ flexWrap: "wrap", textAlign: "left" }}
      >
        {results.length > 0 ? (
          results.map((result, index) => {
            if (result.media_type == "person") {
              return (
                <NavLink className="navlink" to={`/person/${result.id}`}>
                  <div className="movie-card mb-50" style={{ marginTop: 50 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${result.profile_path}`}
                      alt=""
                    />
                    <h3 className="movie-title">{result.name}</h3>
                    <p className="movie-date">Actor</p>
                  </div>
                </NavLink>
              );
            } else if (result.media_type == "movie") {
              return (
                <NavLink className="navlink" to={`/movie/${result.id}`}>
                  <div className="movie-card mb-50" style={{ marginTop: 50 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                      alt=""
                    />
                    <h3 className="movie-title">
                      {result.original_title} (
                      {result.release_date != undefined ? result.release_date.substring(0, 4) : ''})
                    </h3>
                    <p className="movie-date">Movie</p>
                  </div>
                </NavLink>
              );
            } else if (result.media_type == "tv") {
              return (
                <NavLink className="navlink" to={`/show/${result.id}`}>
                  <div className="movie-card mb-50" style={{ marginTop: 50 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                      alt=""
                    />
                    <h3 className="movie-title">
                      {result.name} ({result.first_air_date.substring(0, 4)})
                    </h3>
                    <p className="movie-date">TV Show</p>
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
