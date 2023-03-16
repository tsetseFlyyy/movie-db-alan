import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

export const Header = () => {
  const [searchMovies, setMoviesSearch] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [isSearched, setIsSearched] = useState(false);
  const [mobileMenuVisible, isMobileMenuVisible] = useState(false);
  const [mobileSearcherVisible, isMobileSearcherVisible] = useState(false);

  let bool = false;

  const log = () => {
    bool = true;
  };

  const searchResults = useRef();
  const inputElement = useRef();
  const mobileMenu = useRef();

  const searchObject = () => {
    if (searchValue != undefined) {
      const searchMoviesURL = `https://api.themoviedb.org/3/search/multi?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US&query=${searchValue}&page=1&include_adult=false`;
      axios.get(searchMoviesURL).then((response) => {
        console.log("Movies", response.data);
        setMoviesSearch(response.data);
        if (response.data.results.length > 0) {
          searchResults.current.style.display = "block";
          inputElement.current.focus();
        } else {
          searchResults.current.style.display = "none";
        }
      });
      setIsSearched(true);
    }
  };

  const searchMobileObject = () => {
    if (searchValue != undefined) {
      const searchMoviesURL = `https://api.themoviedb.org/3/search/multi?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US&query=${searchValue}&page=1&include_adult=false`;
      axios.get(searchMoviesURL).then((response) => {
        console.log("Search", response.data);
        setMoviesSearch(response.data);
      });
      setIsSearched(true);
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    // console.log(event.target.value);
  };

  const onFocus = () => {
    if (searchMovies.results != undefined && searchMovies.results.length > 0) {
      searchResults.current.style.display = "block";
    }
  };

  const onBlur = () => {
    if (bool) {
      searchResults.current.style.display = "none";
    }
    // searchResults.current.style.display = "none";
    bool = false;
  };

  const burgerOnClick = () => {
    isMobileMenuVisible(!mobileMenuVisible);
  };

  const onMobileSearcherClick = () => {
    isMobileSearcherVisible(!mobileSearcherVisible);
  };

  return (
    <header>
      <div className="header container" style={{ padding: "15px 0" }}>
        <div className="header-categories">
          <NavLink style={{ textDecoration: "none" }} to="/">
            <h1 className="header-title pointer">MVDB</h1>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/movies/all">
            <p className="header-category pointer">Movies</p>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/shows/all">
            <p className="header-category pointer">TV Shows</p>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="/persons/popular">
            <p className="header-category pointer">People</p>
          </NavLink>
        </div>
        <div className="header-options">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <input
              className="header-search-input"
              type="text"
              placeholder="Type actor, movie or tv show..."
              onChange={handleChange}
              value={searchValue}
              onFocus={onFocus}
              onBlur={onBlur}
              ref={inputElement}
            />
            <div
              className="pointer search-button"
              onClick={searchObject}
              style={{ padding: "9px 10px" }}
            >
              <p>Search</p>
              <img src={require("../assets/icons/Search.png")} alt="" />
            </div>
            <div className="search-results" ref={searchResults}>
              {isSearched === true && searchMovies.results != null ? (
                searchMovies.results.map((result, index) => {
                  if (index < 3) {
                    if (result.media_type == "person") {
                      return (
                        <NavLink
                          className="navlink"
                          onClick={onBlur}
                          to={`/person/${result.id}`}
                        >
                          <div className="search-card" onClick={log}>
                            <img
                              style={{ width: "120px" }}
                              src={`https://image.tmdb.org/t/p/original${result.profile_path}`}
                              alt=""
                            />
                            <div className="search-card-info">
                              <h3>{result.name}</h3>
                              <p className="movie-date">Actor</p>
                            </div>
                          </div>
                        </NavLink>
                      );
                    } else if (result.media_type == "movie") {
                      return (
                        <NavLink
                          className="navlink"
                          to={`/movie/${result.id}`}
                          onClick={onBlur}
                        >
                          <div className="search-card" onClick={log}>
                            <img
                              style={{ width: "120px" }}
                              src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                              alt=""
                            />
                            <div className="search-card-info">
                              <h3>
                                {result.original_title} (
                                {result.release_date.substring(0, 4)})
                              </h3>
                              <p className="movie-date">Movie</p>
                            </div>
                          </div>
                        </NavLink>
                      );
                    } else if (result.media_type == "tv") {
                      return (
                        <NavLink
                          className="navlink"
                          to={`/show/${result.id}`}
                          onClick={onBlur}
                        >
                          <div className="search-card" onClick={log}>
                            <img
                              style={{ width: "120px" }}
                              src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                              alt=""
                            />
                            <div className="search-card-info">
                              <h3>
                                {result.name} (
                                {result.first_air_date.substring(0, 4)})
                              </h3>
                              <p className="movie-date">TV Show</p>
                            </div>
                          </div>
                        </NavLink>
                      );
                    }
                  }
                })
              ) : (
                <></>
              )}
              {isSearched === true && searchMovies.results != null ? (
                <NavLink
                  className="navlink"
                  to={`/search-results/${searchValue}`}
                  onClick={onBlur}
                >
                  <p className="all-results" onClick={log}>
                    Show all results
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {mobileMenuVisible ? (
          <img
            className="burger-menu"
            onClick={burgerOnClick}
            src={require("../assets/icons/exit-button.png")}
            alt=""
          />
        ) : (
          <img
            className="burger-menu"
            onClick={burgerOnClick}
            src={require("../assets/icons/burger-menu.png")}
            alt=""
          />
        )}
      </div>
      {mobileMenuVisible ? (
        <div className="mobile-menu" ref={mobileMenu}>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NavLink style={{ textDecoration: "none" }} to="/movies/all">
                <p
                  className="mobile-menu-options underline"
                  onClick={burgerOnClick}
                >
                  Movies
                </p>
              </NavLink>
              <NavLink style={{ textDecoration: "none" }} to="/shows/all">
                <p
                  className="mobile-menu-options underline"
                  onClick={burgerOnClick}
                >
                  TV Shows
                </p>
              </NavLink>
              <NavLink style={{ textDecoration: "none" }} to="/persons/popular">
                <p
                  className="mobile-menu-options underline"
                  onClick={burgerOnClick}
                >
                  PEOPLE
                </p>
              </NavLink>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="pointer mobile-menu-options"
                onClick={onMobileSearcherClick}
              >
                <p className="underline">Search</p>
              </div>
            </div>
            {mobileSearcherVisible ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 35,
                  }}
                >
                  <input
                    className="header-search-input"
                    type="text"
                    placeholder="Type actor, movie or tv show..."
                    onChange={handleChange}
                    value={searchValue}
                    //  onFocus={onFocus}
                    //  onBlur={onBlur}
                    //  ref={inputElement}
                  />
                  <div
                    className="pointer search-button"
                    onClick={searchMobileObject}
                    style={{ padding: "9px 10px" }}
                  >
                    <p>Search</p>
                    <img src={require("../assets/icons/Search.png")} alt="" />
                  </div>
                </div>
                <div className="movies-container">
                  {searchMovies.results != null ? (
                    searchMovies.results.map((result) => {
                      if (result.media_type == "person") {
                        return (
                          <NavLink
                            className="navlink"
                            to={`/person/${result.id}`}
                          >
                            <div className="movie-card" onClick={burgerOnClick}>
                              <img
                                style={{ width: 100 }}
                                src={`https://image.tmdb.org/t/p/original${result.profile_path}`}
                                alt="image"
                              />
                              <h3 className="movie-title">{result.name}</h3>
                              <p className="movie-date media-type">Actor</p>
                            </div>
                          </NavLink>
                        );
                      } else if (result.media_type == "movie") {
                        return (
                          <NavLink
                            className="navlink"
                            to={`/movie/${result.id}`}
                          >
                            <div className="movie-card" onClick={burgerOnClick}>
                              <img
                                style={{ width: 100 }}
                                src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                                alt="image"
                              />
                              <h3 className="movie-title">
                                {result.original_title}
                              </h3>
                              <p className="movie-date media-type">Movie</p>
                            </div>
                          </NavLink>
                        );
                      } else if (result.media_type == "tv") {
                        return (
                          <NavLink
                            className="navlink"
                            to={`/show/${result.id}`}
                          >
                            <div className="movie-card" onClick={burgerOnClick}>
                              <img
                                style={{ width: 100 }}
                                src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                                alt="image"
                              />
                              <h3 className="movie-title">{result.name}</h3>
                              <p className="movie-date media-type">TV Show</p>
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
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};
