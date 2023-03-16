import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

import axios from "axios";
import { ContentCarousel } from "../components/ContentCarousel";

export const AllContentPage = () => {
  const { type } = useParams();
  const { category } = useParams();

  let isMovie = false;

  if (type == "movies") {
    isMovie = true;
  } else if (type == "shows") {
    isMovie = false;
  } else if (type == "persons") {
  }
  console.log(type);

  const [moviesArray, setMoviesArray] = useState([]);

  const moviesInCinemaUrl =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const moviesPopularUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const moviesTOPsUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const moviesUpcomingUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=5d55a3cba36b527e0435c9a070f8f04f";

  const showsOnTVUrl =
    "https://api.themoviedb.org/3/tv/airing_today?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const showsPopularUrl =
    "https://api.themoviedb.org/3/tv/popular?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const showsTOPsUrl =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=5d55a3cba36b527e0435c9a070f8f04f";

  const popularPeopleURL =
    "https://api.themoviedb.org/3/person/popular?api_key=5d55a3cba36b527e0435c9a070f8f04f";

  let categoryUrl = "";
  let categoryTitle = "";

  if (type == "movies") {
    if (category == "cinema") {
      categoryUrl = moviesInCinemaUrl;
      categoryTitle = "All Movies in Cinemas";
    } else if (category == "popular") {
      categoryUrl = moviesPopularUrl;
      categoryTitle = "All Popular Movies";
    } else if (category == "tops") {
      categoryUrl = moviesTOPsUrl;
      categoryTitle = "100 Best Movies";
    } else if (category == "upcoming") {
      categoryUrl = moviesUpcomingUrl;
      categoryTitle = "All Upcoming";
    }
  } else if (type == "shows") {
    if (category == "on-tv") {
      categoryUrl = showsOnTVUrl;
      categoryTitle = "All Shows On TV";
    } else if (category == "popular") {
      categoryUrl = showsPopularUrl;
      categoryTitle = "All Popular TV Shows";
    } else if (category == "tops") {
      categoryUrl = showsTOPsUrl;
      categoryTitle = "100 Best TV Shows";
    }
  } else if (type == "persons") {
    categoryUrl = popularPeopleURL;
    categoryTitle = "Popular People";
  }

  useEffect(() => {
    axios.get(categoryUrl).then((response) => {
      setMoviesArray(response.data.results);
      console.log(response.data.results);
    });
  }, []);
  return (
    <div
      className="container"
      style={{ paddingTop: "200px", textAlign: "center" }}
    >
      <div>
        {category == "all" ? (
          <div>
            <h1
              style={{
                marginBottom: "50px",
                fontSize: "35px",
                textTransform: "uppercase",
              }}
              className="place"
            >
              {type}
            </h1>
            <ContentCarousel
              url={isMovie ? moviesInCinemaUrl : showsOnTVUrl}
              type={type.slice(0, -1)}
              //  isMovie={isMovie}
              isLimited={true}
              contentLocation={isMovie ? "In Cinemas" : "On TV"}
              category={isMovie ? "cinema" : "on-tv"}
              flexWrap={"nowrap"}
            />
            <ContentCarousel
              url={isMovie ? moviesPopularUrl : showsPopularUrl}
              type={type.slice(0, -1)}
              isMovie={isMovie}
              isLimited={true}
              contentLocation="Popular"
              category="popular"
              flexWrap={"nowrap"}
            />
            <ContentCarousel
              url={isMovie ? moviesTOPsUrl : showsTOPsUrl}
              type={type.slice(0, -1)}
              isMovie={isMovie}
              isLimited={true}
              contentLocation="Top-100"
              category="tops"
              flexWrap={"nowrap"}
            />
            <ContentCarousel
              url={isMovie ? moviesUpcomingUrl : <></>}
              display={isMovie ? "" : "none"}
              type={type.slice(0, -1)}
              isMovie={isMovie}
              isLimited={true}
              contentLocation="Upcoming"
              category="upcoming"
              flexWrap={"nowrap"}
            />
          </div>
        ) : (
          <div>
            <h1
              style={{
                marginBottom: "50px",
                fontSize: "30px",
                textTransform: "capitalize",
              }}
              className="place"
            >
              {category} {type}
            </h1>
            <ContentCarousel
              url={categoryUrl}
              isMovie={isMovie}
              display={"none"}
              isLimited={false}
              flexWrap={"wrap"}
              type={type.slice(0, -1)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
