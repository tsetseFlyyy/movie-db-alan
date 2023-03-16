import "../assets/styles/Main.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { ContentCarousel } from "../components/ContentCarousel";

export const Main = () => {
  //MOVIES
  const [movieInfo, setMoviesArray] = useState([]);

  const moviesInCinemaUrl =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const moviesPopularUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const moviesTOPsUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const moviesUpcomingUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=5d55a3cba36b527e0435c9a070f8f04f";

  //TV SHOWS
  const showsOnTVUrl =
    "https://api.themoviedb.org/3/tv/airing_today?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const showsPopularUrl =
    "https://api.themoviedb.org/3/tv/popular?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const showsTOPsUrl =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=5d55a3cba36b527e0435c9a070f8f04f";

  //PEOPLE
  const popularPeopleURL =
    "https://api.themoviedb.org/3/person/popular?api_key=5d55a3cba36b527e0435c9a070f8f04f";

  useEffect(() => {
    axios.get(moviesInCinemaUrl).then((response) => {
      setMoviesArray(response.data.results[0]);
    });
  }, []);
  return (
    <div className="container">
      <div className="main-poster">
        {movieInfo.id != undefined ? (
          <NavLink className="navlink" to={`movie/${movieInfo.id}`}>
            <div
              className="poster-movie pointer"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}')`,
              }}
            >
              <h1 className="poster-movie-title shadow">
                {movieInfo.title} ({movieInfo.release_date.substring(0, 4)})
              </h1>
              <h2 className="poster-type shadow">Movie</h2>
            </div>
          </NavLink>
        ) : (
          <></>
        )}
      </div>

      <h2
        className="place"
        style={{ marginTop: 100, textAlign: "center", fontSize: 35 }}
      >
        MOVIES
      </h2>

      <ContentCarousel
        url={moviesInCinemaUrl}
        type="movie"
        isMovie={true}
        contentLocation="In Cinemas"
        category="cinema"
        isLimited={true}
      />
      <ContentCarousel
        url={moviesPopularUrl}
        type="movie"
        isMovie={true}
        contentLocation="Popular"
        category="popular"
        isLimited={true}
      />
      <ContentCarousel
        url={moviesTOPsUrl}
        type="movie"
        isMovie={true}
        contentLocation="Top-100"
        category="tops"
        isLimited={true}
      />
      <ContentCarousel
        url={moviesUpcomingUrl}
        type="movie"
        isMovie={true}
        contentLocation="Upcoming"
        category="upcoming"
        isLimited={true}
      />

      <h2
        className="place"
        style={{ marginTop: 100, textAlign: "center", fontSize: 35 }}
      >
        TV SHOWS
      </h2>

      <ContentCarousel
        url={showsOnTVUrl}
        type="show"
        isMovie={false}
        contentLocation="On TV"
        category="on-tv"
        isLimited={true}
      />
      <ContentCarousel
        url={showsPopularUrl}
        type="show"
        isMovie={false}
        contentLocation="Popular"
        category="popular"
        isLimited={true}
      />
      <ContentCarousel
        url={showsTOPsUrl}
        type="show"
        isMovie={false}
        contentLocation="TOP-100"
        category="tops"
        isLimited={true}
      />

      <h2
        className="place"
        style={{ marginTop: 100, textAlign: "center", fontSize: 35 }}
      >
        PEOPLE
      </h2>

      <ContentCarousel
        url={popularPeopleURL}
        //  isMovie={false}
        type="person"
        contentLocation="Popular People"
        category="popular"
        isLimited={true}
      />
    </div>
  );
};
