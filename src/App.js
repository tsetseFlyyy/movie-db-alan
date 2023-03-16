import "./App.css";

// LIBRARIES
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

//COMPONENTS
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// PAGES
import { Main } from "./pages/Main";
import { ContentPage } from "./pages/ContentPage";
import { AllMedia } from "./pages/AllMedia";
import { ShowPage } from "./pages/ShowPage";
import { PersonPage } from "./pages/PersonPage";
import { SearchedResultsPage } from "./pages/SearchedResultsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AllContentPage } from "./pages/AllContentPage";
import { AllActors } from "./pages/AllActors";
import { AllActorsShows } from "./pages/AllActorsShows";
import { AllMediaShows } from "./pages/AllMediaShows";
import { AllRecMovies } from "./pages/AllRecMovies";
import { AllRecShows } from "./pages/AllRecShows";
import { ActorMedia } from "./pages/ActorMedia";
import axios from "axios";

const App = () => {
  const trendingPeopleURL =
    "https://api.themoviedb.org/3/trending/person/week?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const popularPeopleURL =
    "https://api.themoviedb.org/3/person/popular?api_key=5d55a3cba36b527e0435c9a070f8f04f";
  const day = `https://api.themoviedb.org/3/trending/person/day?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
  useEffect(() => {
    // axios.get(trendingPeopleURL).then((response) => {
    //   console.log("WEEK-----------------------------------");
    //   response.data.results.map((result) => {
    //     console.log(result.name);
    //   });
    // });
   // axios.get(day).then((response) => {
   //   console.log("DAY----------------------------------------");
   //   response.data.results.map((result) => {
   //     console.log(result.known_for_department);
   //   });
   // });
    // axios.get(popularPeopleURL).then((response) => {
    //   console.log("POPULAR----------------------------------------");
    //   response.data.results.map((result) => {
    //     console.log(result);
    //   });
    // });
  });
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:type/:category" element={<AllContentPage />} />
        <Route path="/shows/cast/:id" element={<AllActorsShows />} />
        <Route path="/movies/cast/:id" element={<AllActors />} />
        <Route path="/person/:id" element={<PersonPage />} />
        <Route path="/actor/media/:id" element={<ActorMedia />} />
        <Route path="/movies/media/:id" element={<AllMedia />} />
        <Route path="/shows/media/:id" element={<AllMediaShows />} />
        <Route path="/movies/recommendations/:id" element={<AllRecMovies />} />
        <Route path="/shows/recommendations/:id" element={<AllRecShows />} />
        <Route path="/movie/:id" element={<ContentPage />} />
        <Route path="/show/:id" element={<ShowPage />} />
        <Route path="/search-results/:id" element={<SearchedResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
