import { useEffect, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import StarsRating from "../StarsRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const thumbDummy =
  "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg";

const KEY = "96b0c5b9";

function MoviesDetails({ selected, onCloseHandel, onAddToWatched, watched }) {
  const [details, setDetail] = useState({});
  const [userRating, setUserRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function movieDetailsData() {
      try {
        setIsLoading(true);
        setError("");
        setDetail({});

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selected}`,
        );

        if (!res.ok) {
          throw new Error("Something went wrong while fetching movie data.");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Movie not found.");
        }
        setDetail(data);
        //console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (selected) {
      movieDetailsData();
    }
  }, [selected]);

  const {
    Actors,
    Title,
    Year,
    Poster,
    imdbRating,
    Plot,
    Director,
    Genre,
    Runtime,
    Released,
  } = details;

  function watchedMovieAdded() {
    if (!Runtime || !userRating) return;

    const watchedData = {
      imdbID: selected,
      Poster,
      Title,
      Year,
      userRating,
      imdbRating: Number(imdbRating.split(" ").at(0)),
      Runtime: Number(Runtime.split(" ").at(0)),
    };

    onAddToWatched(watchedData);
    onCloseHandel();
  }
  // Escape with Back button and CleanupEvent listners
  useEffect(
    function () {
      function escapCallBack(e) {
        if (e.code === "Escape") {
          onCloseHandel("");
          console.log("CLOSE");
        }
      }

      document.addEventListener("keydown", escapCallBack);

      return function () {
        document.removeEventListener("keydown", escapCallBack);
      };
    },
    [onCloseHandel],
  );

  // console.log("DRIVE STATE", watched);
  const isSelectedMovies = watched
    .map((item) => item.imdbID)
    .includes(selected);
  //console.log("SELECTED ID", isSelectedMovies);

  useEffect(
    function () {
      if (!Title) return;
      document.title = `Movie | ${Title}`;
      return () => {
        document.title = "Use Popcorn Movie";
        console.log("UNMOUNDTED CLEANUP");
      };
    },
    [Title],
  );

  return (
    <div className="relative min-h-40">
      <button
        onClick={onCloseHandel}
        className="absolute left-0 top-0 z-10 m-2 flex h-6 w-6
        items-center justify-center rounded-full border border-gray-300
        bg-white font-semibold text-gray-700 shadow-lg
        hover:bg-indigo-600 hover:text-white"
        aria-label="Go back"
      >
        <HiArrowNarrowLeft />
      </button>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <>
          <div className="flex gap-2 bg-neutral-700 text-white">
            <figure>
              <img
                src={Poster}
                onError={(e) => {
                  e.currentTarget.src = thumbDummy;
                }}
                alt={Title}
                className="h-36 object-cover"
              />
            </figure>

            <div className="space-y-1 p-3 text-sm">
              <h2 className="mb-3 text-xl font-semibold">{Title}</h2>
              <h4>
                {Released} - {Runtime}
              </h4>
              <h5>{Genre}</h5>
              <p>⭐ {imdbRating} IMDB Rating</p>
            </div>
          </div>

          {!isSelectedMovies ? (
            <div className="p-4">
              <StarsRating
                maxRating={10}
                fillColor="yellow"
                setUserRating={setUserRating}
              />

              {Number(userRating) > 0 && (
                <button
                  onClick={watchedMovieAdded}
                  className="mt-3 cursor-pointer rounded-full
                bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                  Add To Watched
                </button>
              )}
            </div>
          ) : (
            <p className="p-4 bg-amber-100 text-base font-semibold text-black">
              Already Selected this movie
            </p>
          )}

          <div className="px-4">
            <p className="mb-4 text-base">
              <i>{Plot}</i>
            </p>

            <p>
              <strong>Starring:</strong> {Actors}
            </p>

            <p>
              <strong>Directed by:</strong> {Director}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default MoviesDetails;
