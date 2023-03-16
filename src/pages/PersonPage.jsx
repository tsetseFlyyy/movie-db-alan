import { useState, useCallback, useEffect } from "react";
import { useParams,NavLink } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";

import axios from "axios";

export const PersonPage = () => {
  const { id } = useParams();
  const [actorInfo, setActorInfo] = useState([]);
  const [actorKnownFor, setActorKnownFor] = useState([]);
  const [actorMedia, setActorMedia] = useState([]);
  const [mediaArrayImages, setMediaArrayImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  let mediaImages = [];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const actorInfoURL = `https://api.themoviedb.org/3/person/${id}?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(actorInfoURL).then((response) => {
      setActorInfo(response.data);
    });
    const actorMoviesURL = ` https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(actorMoviesURL).then((response) => {
      setActorKnownFor(response.data);
    });
    const actorMediaURL = `https://api.themoviedb.org/3/person/${id}/images?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(actorMediaURL).then((response) => {
      setActorMedia(response.data.profiles);
      response.data.profiles.map((image, index) => {
        if (index < 6) {
          mediaImages.push(
            `https://image.tmdb.org/t/p/original${image.file_path}`
          );
        }
      });
      setMediaArrayImages(mediaImages);
    });
  }, []);

  let dotCount = 0;

  if (actorInfo.length != 0) {
    for (let i = 0; i < actorInfo.biography.length; i++) {
      if (actorInfo.biography[i] == ".") {
        dotCount++;
        if (dotCount == 2) {
          actorInfo.biography = actorInfo.biography.substring(0, i + 1);
        }
      }
    }
  }

  if (id != actorInfo.id) {
    const actorInfoURL = `https://api.themoviedb.org/3/person/${id}?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(actorInfoURL).then((response) => {
      setActorInfo(response.data);
    });
    const actorMoviesURL = ` https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(actorMoviesURL).then((response) => {
      setActorKnownFor(response.data);
    });
    const actorMediaURL = `https://api.themoviedb.org/3/person/${id}/images?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(actorMediaURL).then((response) => {
      setActorMedia(response.data.profiles);
      response.data.profiles.map((image, index) => {
        if (index < 6) {
          mediaImages.push(
            `https://image.tmdb.org/t/p/original${image.file_path}`
          );
        }
      });
      setMediaArrayImages(mediaImages);
    });
  }

  return (
    <div className="movie-page container">
      <div className="main-details">
        <img
          src={`https://image.tmdb.org/t/p/w300${actorInfo.profile_path}`}
          alt=""
        />
        <div>
          <h1 className="movie_title" style={{ marginLeft: 50 }}>
            {actorInfo.name}
          </h1>
          <div className="main-details">
            <div className="movie_info">
              <h2 className="detail">Personal info</h2>
              <div className="detail-wrapper">
                <div className="detail-category">
                  <p>Birthday:</p>
                  <p>Birthplace:</p>
                  <p>Gender:</p>
                  <p>Known For:</p>
                  <p>Also Known As:</p>
                </div>
                <div className="detail-info">
                  {actorInfo.birthday != null ? (
                    <p>
                      {actorInfo.birthday.substring(8, 10)}{" "}
                      {actorInfo.birthday.substring(5, 7) == `01` ? (
                        <span>January</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `02` ? (
                        <span>February</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `03` ? (
                        <span>March</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `04` ? (
                        <span>April</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `05` ? (
                        <span>May</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `06` ? (
                        <span>June</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `07` ? (
                        <span>July</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `08` ? (
                        <span>August</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `09` ? (
                        <span>September</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `10` ? (
                        <span>October</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `11` ? (
                        <span>November</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(5, 7) == `12` ? (
                        <span>December</span>
                      ) : (
                        <></>
                      )}{" "}
                      {actorInfo.birthday.substring(0, 4)} (
                      {2022 - +actorInfo.birthday.substring(0, 4)} years old)
                    </p>
                  ) : (
                    <></>
                  )}

                  {actorInfo.length != 0 ? (
                    <p>{actorInfo.place_of_birth}</p>
                  ) : (
                    <></>
                  )}
                  {actorInfo.gender == 1 ? <p>Female</p> : <p>Male</p>}
                  {actorInfo.length != 0 ? (
                    <p>{actorInfo.known_for_department}</p>
                  ) : (
                    <></>
                  )}
                  <p>
                    {actorInfo.length != 0 &&
                      actorInfo.also_known_as.map((name, index) => {
                        if (index < 3) {
                          return <span> {name} |</span>;
                        }
                      })}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ width: 500 }}>
              <h2 className="detail">Biography</h2>
              <p style={{ marginTop: 15 }}>{actorInfo.biography}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-details-mobile">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            className="actor-img"
            style={{ width: 150 }}
            src={`https://image.tmdb.org/t/p/original${actorInfo.profile_path}`}
            alt=""
          />
          <div style={{ marginLeft: 30 }}>
            <h1
              className="movie_title name"
              style={{ textAlign: "left", marginBottom: 0 }}
            >
              {actorInfo.name}
            </h1>
            <div
              className="detail-category white-color"
              style={{ alignItems: "start", flexDirection: "column" }}
            >
              {actorInfo.birthday != null ? (
                <p>
                  <span style={{ color: "#878792" }}>Birthday:</span> <br />
                  {actorInfo.birthday.substring(8, 10)}{" "}
                  {actorInfo.birthday.substring(5, 7) == `01` ? (
                    <span>January</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `02` ? (
                    <span>February</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `03` ? (
                    <span>March</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `04` ? (
                    <span>April</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `05` ? (
                    <span>May</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `06` ? (
                    <span>June</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `07` ? (
                    <span>July</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `08` ? (
                    <span>August</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `09` ? (
                    <span>September</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `10` ? (
                    <span>October</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `11` ? (
                    <span>November</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(5, 7) == `12` ? (
                    <span>December</span>
                  ) : (
                    <></>
                  )}{" "}
                  {actorInfo.birthday.substring(0, 4)} (
                  {2022 - +actorInfo.birthday.substring(0, 4)} years old)
                </p>
              ) : (
                <></>
              )}

              {actorInfo.length != 0 ? (
                <p>
                  <span style={{ color: "#878792" }}>Place of birth:</span>
                  <br />
                  {actorInfo.place_of_birth}
                </p>
              ) : (
                <></>
              )}
              {actorInfo.gender == 1 ? (
                <p>
                  <span style={{ color: "#878792" }}>Gender:</span>
                  <br />
                  Female
                </p>
              ) : (
                <p>
                  <span style={{ color: "#878792" }}>Gender:</span>
                  <br />
                  Male
                </p>
              )}
              {actorInfo.length != 0 ? (
                <p>
                  <span style={{ color: "#878792" }}>Job:</span>
                  <br />
                  {actorInfo.known_for_department}
                </p>
              ) : (
                <></>
              )}
              <p>
                <span style={{ color: "#878792" }}>Known as: </span>
                <br />
                {actorInfo.length != 0 &&
                  actorInfo.also_known_as.map((name, index) => {
                    if (index < 1) {
                      if (index == 0) {
                        return <span>{name}</span>;
                      }
                    }
                  })}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="detail">Biography</h2>
          <p className="overview">{actorInfo.biography}</p>
        </div>
      </div>
      <div className="known-for">
        <h2 className="detail">Known For</h2>
        <div className="known-for-movies movies-container"
          style={{ marginTop: 50, textAlign: "left" }}>
          {actorKnownFor.length != 0 &&
            actorKnownFor.cast.map((movie, index) => {
              if (index < 6 && movie.poster_path != null) {
                return (
                  <NavLink className="navlink" to={`/movies/${movie.id}`}>
                    <div className="movie-card">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt=""
                      />
                      <h3 className="movie-title">{movie.original_title}</h3>
                    </div>
                  </NavLink>
                );
              }
            })}
        </div>
      </div>
      <div className="media">
        <div className="between">
          <h2 className="detail">Media</h2>
          <NavLink className="navlink" to={`/actor/media/${id}`}>
            <h2 className="see-all pointer detail">See All</h2>
          </NavLink>
        </div>
        <div className="movies-container"
          style={{ marginTop: 50, textAlign: "left" }}>
          {actorMedia != 0 ? (
            actorMedia.map((media, index) => {
              if (index < 6) {
                return (
                  <img
                    className="pointer media-img media-img-person"
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
      <div className="filmography">
        <h2 className="detail">Filmography</h2>
        <div className="films">
          {actorKnownFor.length != 0 &&
            actorKnownFor.cast.map((movie, index) => {
              if (index < 6) {
                if (movie.media_type == "movie") {
                  return (
                    <NavLink className="navlink" to={`/movies/${movie.id}`}>
                      <div className="film-card  div-block">
                        <img
                          style={{ width: 150 }}
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt=""
                        />
                        <div className="info">
                          <h2>{movie.original_title}</h2>
                          <h3 className="movie-date">{movie.character}</h3>
                          <p>{movie.overview}</p>
                        </div>
                        <div className="film-ratings">
                          <h2 className="rating">
                            {Math.round(movie.vote_average)}
                          </h2>
                          <p className="vote-count">{movie.vote_count} votes</p>
                        </div>
                      </div>
                      <div className="film-card-mobile film-card">
                        <div style={{ display: "flex" }}>
                          <img
                            style={{ width: 100 }}
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt=""
                          />
                          <div className="info" style={{ marginLeft: 20 }}>
                            <h2 style={{ fontSize: 18 }}>
                              {movie.original_title}
                            </h2>

                            <h3 className="movie-date role">
                              {movie.character}
                            </h3>
                            <div className="film-ratings">
                              <h2 className="rating">
                                {Math.round(movie.vote_average)}
                                <span>/10</span>
                              </h2>
                              <p className="vote-count">
                                {movie.vote_count} votes
                              </p>
                            </div>
                          </div>
                        </div>
                        <p style={{ marginTop: 20 }}>{movie.overview}</p>
                      </div>
                    </NavLink>
                  );
                } else if (movie.media_type == "tv") {
                  return (
                    <NavLink className="navlink" to={`/shows/${movie.id}`}>
                      <div className="film-card  div-block">
                        <img
                          style={{ width: 150 }}
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt=""
                        />
                        <div className="info">
                          <h2>{movie.original_title}</h2>
                          <h3 className="movie-date">{movie.character}</h3>
                          <p>{movie.overview}</p>
                        </div>
                        <div className="film-ratings">
                          <h2 className="rating">
                            {Math.round(movie.vote_average)}
                            <span>/10</span>
                          </h2>
                          <p className="vote-count">{movie.vote_count} votes</p>
                        </div>
                      </div>
                      <div className="film-card-mobile film-card">
                        <div style={{ display: "flex" }}>
                          <img
                            style={{ width: 100 }}
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt=""
                          />
                          <div className="info" style={{ marginLeft: 20 }}>
                            <h2 style={{ fontSize: 18 }}>
                              {movie.original_title}
                            </h2>

                            <h3 className="movie-date role">
                              {movie.character}
                            </h3>
                            <div className="film-ratings">
                              <h2 className="rating">
                                {Math.round(movie.vote_average)}
                              </h2>
                              <p className="vote-count">
                                {movie.vote_count} votes
                              </p>
                            </div>
                          </div>
                        </div>
                        <p style={{ marginTop: 20 }}>{movie.overview}</p>
                      </div>
                    </NavLink>
                  );
                }
              }
            })}
        </div>
      </div>
    </div>
  );
};
