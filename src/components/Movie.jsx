import { useState } from "react";
import Button from "./Button";

const thumbDummy =
  "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg";

function Movie({ tempMovieData, onSelectingHandel }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="flex justify-between items-center px-4 pt-4 mb-6">
        <h4 className="font-semibold">All Movies List</h4>
        <Button onClick={() => setIsOpen((toggle) => !toggle)}>
          {isOpen ? "-" : "+"}
        </Button>
      </div>

      <div className="relative">
        {isOpen && (
          <ul className="flex flex-col gap-2">
            {tempMovieData.map((movieItem) => (
              <MoviesList
                movieItem={movieItem}
                key={movieItem.imdbID}
                onSelectingHandel={onSelectingHandel}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function MoviesList({ movieItem, onSelectingHandel }) {
  const { Poster, Title, Year } = movieItem;

  return (
    <>
      <li
        className="flex gap-3 hover:bg-neutral-700 px-4 py-2 cursor-pointer"
        onClick={() => onSelectingHandel(movieItem.imdbID)}
      >
        <img
          src={Poster}
          alt={Title}
          onError={(e) => {
            e.currentTarget.src = thumbDummy;
          }}
          className="rounded-lg w-12"
        />
        <h3 className="text-xl font-semibold flex flex-col">
          {Title} <span className="text-sm font-normal">📅 {Year}</span>
        </h3>
      </li>
    </>
  );
}

export default Movie;
