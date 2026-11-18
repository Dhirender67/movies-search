import { useEffect, useState } from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Movie from "./components/Movie";
import WatchedMovie from "./components/WatchedMovie";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MoviesDetails from "./components/MoviesDetails";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [search, setSearch] = useState("marvel");
  const [selected, setSelected] = useState(null);

  //API ERROR and LOADING handling manualy
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const query = "marvel";
  // console.log(search);

  // Selecting
  function handelSelectingMovies(id) {
    console.log("SELECTED", id);
    setSelected((prevItem) => (prevItem === id ? null : id));
  }

  function handelBack() {
    setSelected(null);
  }

  // API Handling
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovie() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${search}`,
            { signal: controller.signal },
          );
          if (!res.ok) throw new Error("Somthing went wrong Fetch Movie");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Response is Failed");
          setMovies(data.Search);
          setError("");
          //console.log(data);
        } catch (err) {
          //console.log(err.message);
          if (err.name === "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
          setError("");
        }
      }

      // When user enter max 4 alpahabet after then API requet
      if (search.length < 4) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovie();
      return function () {
        controller.abort();
      };
    },
    [search],
  );

  // Added Watched Movies List
  function handleWatchedList(watchedList) {
    setWatched((preWatched) => [...preWatched, watchedList]);
  }

  return (
    <>
      <Header result={movies} search={search} setSearch={setSearch} />
      <Layout>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <Movie
              tempMovieData={movies}
              onSelectingHandel={handelSelectingMovies}
            />
          )}
          {error && <ErrorMessage message="Failed Movie Data load ⛔" />}
          {/* {isLoading ? <Loader /> : <Movie tempMovieData={movies} />} */}
        </Box>
        <Box>
          {selected ? (
            <MoviesDetails
              selected={selected}
              onAddToWatched={handleWatchedList}
              onCloseHandel={handelBack}
              watched={watched}
            />
          ) : (
            <WatchedMovie tempWatchedData={watched} setWatched={setWatched} />
          )}
        </Box>
      </Layout>
    </>
  );
}

export default App;
