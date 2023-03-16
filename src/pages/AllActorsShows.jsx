import { useState } from "react";
import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

export const AllActorsShows = () => {
  const { id } = useParams();
  const [movieBackground, setMovieBackground] = useState();
  const [actorsArray, setActorsArray] = useState([]);

  let count = 0;

  useEffect(() => {
    const movieInfoUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(movieInfoUrl).then((response) => {
      setMovieBackground(response.data);
    });
    const actorsURL = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(actorsURL).then((response) => {
      setActorsArray(response.data.cast);
    });
  }, []);
  return (
    <div className="container">
      {movieBackground != null ? (
        <div
          className="poster-movie pointer"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movieBackground.backdrop_path}')`,
          }}
        >
          <h1 className="poster-movie-title">{movieBackground.name}</h1>
        </div>
      ) : (
        <></>
      )}

      <h2 className="detail" style={{ marginTop: 70 }}>
        Cast
      </h2>
      <div className="movies-container wrapper" style={{ paddingTop: 0 }}>
        {actorsArray.length != 0 ? (
          actorsArray.map((actor, index) => {
            if (actorsArray[index].profile_path != null) {
              return (
                <NavLink className="navlink" to={`/person/${actor.id}`}>
                  <div className="movie-card pointer" style={{ marginTop: 50 }}>
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
  );
};
