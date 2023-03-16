import axios from "axios";

const getMovies = async () => {
  return await axios
    .get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=5d55a3cba36b527e0435c9a070f8f04f"
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const moviesService = {
  getMovies,
};
