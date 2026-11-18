import { HiMiniTrash } from "react-icons/hi2";
import { useState } from "react";
import Button from "./Button";

// Default Images
const thumbDummy =
  "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg";

function WatchedMovie({ tempWatchedData, setWatched }) {
  const [isOpen, setIsOpen] = useState(true);

  //console.log("WATCHED DATA", tempWatchedData);

  // Average Calculation
  function average(arr) {
    return arr.reduce((acc, curr) => acc + curr / arr.length, 0);
  }

  const avgImdbRating = average(
    tempWatchedData.map((movie) => movie.imdbRating),
  );
  const avgUserRating = average(
    tempWatchedData.map((movie) => movie.userRating),
  );
  const avgRuntime = average(tempWatchedData.map((movie) => movie.Runtime));

  // console.log("AVG IMBD", avgImdbRating);
  // console.log("AVG USER RATING", avgUserRating);
  // console.log("AVG RUNTIME", avgRuntime);

  function handleDeleteMovie(id) {
    //console.log("DELETE ID", id);
    setWatched((prevDel) => prevDel.filter((del) => del.imdbID !== id));
  }

  return (
    <>
      <div className="flex flex-col items-center bg-neutral-600 px-4 py-4 shadow-2xl mb-6">
        <div className="flex w-full justify-between items-center mb-3">
          <h4 className="font-semibold uppercase">Movies you watched</h4>
          <Button onClick={() => setIsOpen((toggle) => !toggle)}>
            {isOpen ? "-" : "+"}
          </Button>
        </div>
        <WatchedSummry
          tempWatchedData={tempWatchedData}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
        />
      </div>

      <div className="relative">
        {isOpen && (
          <ul className="flex flex-col gap-2">
            {tempWatchedData.map((watched) => (
              <WatchedMovieList
                handleDeleteMovie={handleDeleteMovie}
                watched={watched}
                key={watched.imdbID}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function WatchedSummry({
  tempWatchedData,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
}) {
  return (
    <>
      <ul className="flex  gap-4 w-full">
        <li>
          {" "}
          <span>#️⃣</span>
          {tempWatchedData.length} Movies
        </li>
        <li>
          {" "}
          <span>✨</span>
          {avgImdbRating}
        </li>
        <li>
          {" "}
          <span>🌟</span>
          {avgUserRating}
        </li>
        <li>
          {" "}
          <span>⏳</span>
          {avgRuntime} Min
        </li>
      </ul>
    </>
  );
}

function WatchedMovieList({ watched, handleDeleteMovie }) {
  const { imdbID, Title, Year, Poster, imdbRating, Runtime, userRating } =
    watched;
  return (
    <>
      <li className="flex gap-3 hover:bg-neutral-700 px-4 py-2 cursor-pointer">
        <img
          src={Poster}
          onError={(e) => {
            e.currentTarget.src = thumbDummy;
          }}
          alt={Title}
          className="rounded-lg w-12"
        />
        <h3 className="text-xl font-semibold flex flex-col">
          {Title}
          <span className="flex gap-3">
            <span className="text-sm font-normal">📅 {Year}</span>
            <span className="text-sm font-normal">✨ {imdbRating}</span>
            <span className="text-sm font-normal">🌟 {userRating}</span>
            <span className="text-sm font-normal">⏳ {Runtime} Min</span>
          </span>
        </h3>
        <span
          onClick={() => handleDeleteMovie(imdbID)}
          className="ml-auto text-base text-red-600 hover:text-red-800"
        >
          <HiMiniTrash />
        </span>
      </li>
    </>
  );
}

export default WatchedMovie;
