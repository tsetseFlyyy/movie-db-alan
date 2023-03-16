import { useParams } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import YouTube from "react-youtube";

import axios from "axios";

export const ShowPage = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState([]);
  const [movieVideo, setMovieVideo] = useState([]);
  const [movieKeywords, setMovieKeywords] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieMedia, setMovieMedia] = useState([]);
  const [mediaArrayImages, setMediaArrayImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [movieRec, setMovieRec] = useState([]);

  const opts = {
    height: "225",
    width: "400",
    playerVars: {
      autoplay: 0,
    },
  };

  const optsMobile = {
    height: "225",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  let mediaImages = [];
  let count = 0;
  let countRec = 0;

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const movieInfoUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(movieInfoUrl).then((response) => {
      setMovieInfo(response.data);
    });
    const movieVideoUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieVideoUrl).then((response) => {
      response.data.results.map((result) => {
        if (result.type == "Trailer") {
          console.log(result.key);
          setMovieVideo(result.key);
        }
      });
    });
    const movieKeywordsUrl = `https://api.themoviedb.org/3/tv/${id}/keywords?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieKeywordsUrl).then((response) => {
      setMovieKeywords(response.data);
    });
    const movieActorsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(movieActorsUrl).then((response) => {
      setMovieActors(response.data);
    });
    const movieMediaUrl = `https://api.themoviedb.org/3/tv/${id}/images?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieMediaUrl).then((response) => {
      setMovieMedia(response.data.backdrops);
      console.log(response.data.backdrops);
      response.data.backdrops.map((image, index) => {
        if (index > 3 && index < 8) {
          mediaImages.push(
            `https://image.tmdb.org/t/p/original${image.file_path}`
          );
        }
      });
      setMediaArrayImages(mediaImages);
    });
    const movieRecommendedUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieRecommendedUrl).then((response) => {
      setMovieRec(response.data);
    });
  }, []);

  if (id != movieInfo.id) {
    const movieInfoUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(movieInfoUrl).then((response) => {
      setMovieInfo(response.data);
    });
    const movieVideoUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieVideoUrl).then((response) => {
      response.data.results.map((result) => {
        if (result.type == "Trailer") {
          setMovieVideo(result.key);
        }
      });
    });
    const movieKeywordsUrl = `https://api.themoviedb.org/3/tv/${id}/keywords?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieKeywordsUrl).then((response) => {
      setMovieKeywords(response.data);
    });
    const movieActorsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(movieActorsUrl).then((response) => {
      setMovieActors(response.data);
    });
    const movieMediaUrl = `https://api.themoviedb.org/3/tv/${id}/images?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieMediaUrl).then((response) => {
      setMovieMedia(response.data.backdrops);
      console.log(response.data.backdrops);
      response.data.backdrops.map((image, index) => {
        if (index > 3 && index < 8) {
          mediaImages.push(
            `https://image.tmdb.org/t/p/original${image.file_path}`
          );
        }
      });
      setMediaArrayImages(mediaImages);
    });
    const movieRecommendedUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieRecommendedUrl).then((response) => {
      setMovieRec(response.data);
    });
  }

  return (
    <div className="movie-page container">
      <div className="main-details">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300${movieInfo.poster_path}`}
            alt=""
          />
          <p className="vote-average">
            <span>{Math.round(movieInfo.vote_average)}/</span>10
          </p>
          <p className="vote-count">{movieInfo.vote_count} votes</p>
        </div>
        <div className="movie_info">
          <h1 className="movie_title">{movieInfo.original_name}</h1>
          <h2 className="detail">Overview</h2>
          <p className="overview">{movieInfo.overview}</p>
          <h2 className="detail">Details</h2>
          <div className="detail-wrapper">
            <div className="detail-category">
              <p>Release date:</p>
              <p>Genres:</p>
              <p>Tagline:</p>
              <p>Number of seasons:</p>
              <p>Origin country:</p>
              <p>Production company:</p>
              <p>Status:</p>
              <p>Homepage:</p>
            </div>
            <div className="detail-info">
              {movieInfo.first_air_date != null ? (
                <p>
                  {movieInfo.first_air_date.charAt(8) != "0"
                    ? movieInfo.first_air_date.substring(8, 10)
                    : movieInfo.first_air_date.substring(9, 10)}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "01" ? (
                    <span>January,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "02" ? (
                    <span>February,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "03" ? (
                    <span>March,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "04" ? (
                    <span>April,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "05" ? (
                    <span>May,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "06" ? (
                    <span>June,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "07" ? (
                    <span>July,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "08" ? (
                    <span>August,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "09" ? (
                    <span>September,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "10" ? (
                    <span>October,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "11" ? (
                    <span>November,</span>
                  ) : (
                    <></>
                  )}{" "}
                  {movieInfo.first_air_date.substring(5, 7) == "12" ? (
                    <span>December,</span>
                  ) : (
                    <></>
                  )}
                  {""}
                  {movieInfo.first_air_date.substring(0, 4)}
                </p>
              ) : (
                <></>
              )}
              {movieInfo.length != 0 ? (
                <p>{movieInfo.genres[0].name}</p>
              ) : (
                <></>
              )}
              <p>{movieInfo.tagline}</p>
              <p>{movieInfo.number_of_seasons}</p>
              {movieInfo.length != 0 &&
              movieInfo.production_countries.length > 0 ? (
                <p>{movieInfo.production_countries[0].iso_3166_1}</p>
              ) : (
                <></>
              )}
              {movieInfo.length != 0 &&
              movieInfo.production_companies.length > 0 ? (
                <p>{movieInfo.production_companies[0].name}</p>
              ) : (
                <></>
              )}
              <p>{movieInfo.status}</p>
              <a
                className="navlink"
                style={{ width: "fit-content" }}
                href={movieInfo.homepage}
                target="_blank"
              >
                <p style={{ marginTop: 10 }}>{movieInfo.homepage}</p>
              </a>
            </div>
          </div>
        </div>
        <div>
          <YouTube videoId={movieVideo} opts={opts} />;
          <h2 className="detail">Keywords</h2>
          <div className="keywords">
            {movieKeywords != 0 ? (
              movieKeywords.results.map((keyword, index) => {
                if (index < 6) {
                  return <p className="keyword">{keyword.name}</p>;
                }
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="main-details-mobile">
        <div
          className="poster-mobile"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}')`,
            height: 225,
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <h1 className="movie_title">{movieInfo.original_name}</h1>
        </div>
        <div className="detail-category">
          {movieInfo.first_air_date != null ? (
            <p>
              <span>
                Release date:
                <br />
              </span>
              {movieInfo.first_air_date.charAt(8) != "0"
                ? movieInfo.first_air_date.substring(8, 10)
                : movieInfo.first_air_date.substring(9, 10)}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "01" ? (
                <span>January,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "02" ? (
                <span>February,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "03" ? (
                <span>March,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "04" ? (
                <span>April,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "05" ? (
                <span>May,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "06" ? (
                <span>June,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "07" ? (
                <span>July,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "08" ? (
                <span>August,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "09" ? (
                <span>September,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "10" ? (
                <span>October,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "11" ? (
                <span>November,</span>
              ) : (
                <></>
              )}{" "}
              {movieInfo.first_air_date.substring(5, 7) == "12" ? (
                <span>December,</span>
              ) : (
                <></>
              )}
              {""}
              {movieInfo.first_air_date.substring(0, 4)}
            </p>
          ) : (
            <></>
          )}
          <p>
            Seasons: <br />
            {movieInfo.number_of_seasons}
          </p>{" "}
          {movieInfo.length != 0 &&
          movieInfo.production_countries.length > 0 ? (
            <p>
              Country: <br />
              {movieInfo.production_countries[0].iso_3166_1}
            </p>
          ) : (
            <></>
          )}
          {movieInfo.length != 0 &&
          movieInfo.production_companies.length > 0 ? (
            <p>
              Production: <br />
              {movieInfo.production_companies[0].name}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div
          className="keywords-rating"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "self-end",
            marginTop: -12,
          }}
        >
          <div className="keywords">
            {movieKeywords != 0 ? (
              movieKeywords.results.map((keyword, index) => {
                if (index < 3) {
                  return <p className="keyword">{keyword.name}</p>;
                }
              })
            ) : (
              <></>
            )}
          </div>
          <div>
            <p className="vote-average">
              <span>{Math.round(movieInfo.vote_average)}/</span>10
            </p>
          </div>
        </div>
        <h2 className="detail">Overview</h2>
        <p className="overview">{movieInfo.overview}</p>
        <h2 className="detail" style={{ marginBottom: 30 }}>
          Trailer
        </h2>
        <YouTube videoId={movieVideo} opts={optsMobile} />;
      </div>
      <div className="cast">
        <div className="between">
          <h2 className="detail">Cast</h2>
          <NavLink className="navlink" to={`/shows/cast/${id}`}>
            <h2 className="see-all pointer detail">See All</h2>
          </NavLink>
        </div>
        <div
          className="actors movies-container"
          style={{ marginTop: 50, textAlign: "left" }}
        >
          {movieActors != 0 ? (
            movieActors.cast.map((actor, index) => {
              if (movieActors.cast[index].profile_path != null && count < 6) {
                count++;
                return (
                  <NavLink className="navlink" to={`/person/${actor.id}`}>
                    <div className="movie-card pointer">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt=""
                      />
                      <h3 className="movie-title">{actor.name}</h3>
                      <h4 className="movie-date">{actor.character}</h4>
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
      <div className="media">
        <div className="between">
          <h2 className="detail">Media</h2>
          <NavLink className="navlink" to={`/shows/media/${id}`}>
            <h2 className="see-all pointer detail">See All</h2>
          </NavLink>
        </div>
        <div
          className="movies-container"
          style={{ marginTop: 50, textAlign: "left" }}
        >
          {movieMedia != 0 ? (
            movieMedia.map((media, index) => {
              if (index > 3 && index < 8) {
                return (
                  <img
                    className="pointer media-img"
                    onClick={() => openImageViewer(index)}
                    key={index}
                    src={`https://image.tmdb.org/t/p/original${media.file_path}`}
                    alt=""
                  />
                );
              }
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={mediaArrayImages}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
      <div className="recommendations">
        <div className="between">
          <h2 className="detail">Recommended</h2>
          <NavLink className="navlink" to={`/shows/recommendations/${id}`}>
            <h2 className="see-all pointer detail">See All</h2>
          </NavLink>
        </div>
        <div
          className="movies-container"
          style={{ marginTop: 50, textAlign: "left" }}
        >
          {movieRec != 0 ? (
            movieRec.results.map((movie, index) => {
              if (movieRec.results[index].poster_path != null && countRec < 6) {
                countRec++;
                return (
                  <NavLink
                    className="navlink"
                    //  onClick={reloadPage}
                    to={`/show/${movie.id}`}
                  >
                    <div className="movie-card pointer">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt="image"
                      />
                      <h3 className="movie-title">{movie.original_name}</h3>
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
    </div>
  );
};
