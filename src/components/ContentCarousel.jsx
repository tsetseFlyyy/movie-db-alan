//import "../assets/styles/Main.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const ContentCarousel = (props) => {
  const [contentArray, setContentArray] = useState([]);
  const [isMovie, setIsMovie] = useState(props.isMovie);
  const [isLimited, setIsLimited] = useState(props.isLimited);
  const [type, setType] = useState(props.type);

  useEffect(() => {
    const url = props.url;
    axios.get(url).then((response) => {
      setContentArray(response.data.results);
    });
  });
  return (
    <div className="movies-section">
      <div className="movies" style={{ display: props.display }}>
        <h2 className="place">{props.contentLocation}</h2>
        <NavLink className="navlink" to={`/${type}s/${props.category}`}>
          <h2 className="see-all pointer">See All</h2>
        </NavLink>
      </div>
      <div className="movies-container" style={{ flexWrap: props.flexWrap }}>
        {contentArray.length != 0 ? (
          contentArray.map((movie, index) => {
            if (isLimited) {
              if (index < 6) {
                return (
                  <NavLink className="navlink" to={`/${type}/${movie.id}`}>
                    <div className="movie-card pointer">
                      <img
                        className="movie-show-img"
                        src={`https://image.tmdb.org/t/p/original${
                          type == "person"
                            ? movie.profile_path
                            : movie.poster_path
                        }`}
                        alt="image"
                      />
                      <h3 className="movie-title">
                        {type == "movie" ? movie.title : <></>}
                        {type == "show" ? movie.name : <></>}
                        {type == "person" ? movie.name : <></>}
                      </h3>
                      {type == "movie" && movie.release_date != undefined ? (
                        <p className="movie-date">
                          {movie.release_date.charAt(8) != "0"
                            ? movie.release_date.substring(8, 10)
                            : movie.release_date.substring(9, 10)}{" "}
                          {movie.release_date.substring(5, 7) == "01" ? (
                            <span>January,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "02" ? (
                            <span>February,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "03" ? (
                            <span>March,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "04" ? (
                            <span>April,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "05" ? (
                            <span>May,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "06" ? (
                            <span>June,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "07" ? (
                            <span>July,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "08" ? (
                            <span>August,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "09" ? (
                            <span>September,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "10" ? (
                            <span>October,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "11" ? (
                            <span>November,</span>
                          ) : (
                            <></>
                          )}{" "}
                          {movie.release_date.substring(5, 7) == "12" ? (
                            <span>December,</span>
                          ) : (
                            <></>
                          )}
                          {""}
                          {movie.release_date.substring(0, 4)}
                        </p>
                      ) : (
                        <></>
                      )}
                      {type == "show" && movie.first_air_date != undefined ? (
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
                      ) : (
                        <></>
                      )}
                      {type == "person" ? (
                        <p className="movie-date">
                          {movie.known_for_department}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </NavLink>
                );
              }
            } else if (!isLimited) {
              console.log(type);
              return (
                <NavLink className="navlink" to={`/${type}/${movie.id}`}>
                  <div className="movie-card pointer" style={{ marginTop: 50, textAlign: 'left' }}>
                    <img
                      className="movie-show-img"
                      src={`https://image.tmdb.org/t/p/original${
                        type == "person"
                          ? movie.profile_path
                          : movie.poster_path
                      }`}
                      alt="image"
                    />
                    <h3 className="movie-title">
                      {type == "movie" ? movie.title : <></>}
                      {type == "show" ? movie.name : <></>}
                      {type == "person" ? movie.name : <></>}
                    </h3>
                    {type == "movie" && movie.release_date != undefined ? (
                      <p className="movie-date">
                        {movie.release_date.charAt(8) != "0"
                          ? movie.release_date.substring(8, 10)
                          : movie.release_date.substring(9, 10)}{" "}
                        {movie.release_date.substring(5, 7) == "01" ? (
                          <span>January,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "02" ? (
                          <span>February,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "03" ? (
                          <span>March,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "04" ? (
                          <span>April,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "05" ? (
                          <span>May,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "06" ? (
                          <span>June,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "07" ? (
                          <span>July,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "08" ? (
                          <span>August,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "09" ? (
                          <span>September,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "10" ? (
                          <span>October,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "11" ? (
                          <span>November,</span>
                        ) : (
                          <></>
                        )}{" "}
                        {movie.release_date.substring(5, 7) == "12" ? (
                          <span>December,</span>
                        ) : (
                          <></>
                        )}
                        {""}
                        {movie.release_date.substring(0, 4)}
                      </p>
                    ) : (
                      <></>
                    )}
                    {type == "show" && movie.first_air_date != undefined ? (
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
                    ) : (
                      <></>
                    )}
                    {type == "person" ? (
                      <p className="movie-date">{movie.known_for_department}</p>
                    ) : (
                      <></>
                    )}
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
