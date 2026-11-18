function Header({ result, search, setSearch }) {
  //console.log("HEADER", result);
  return (
    <header className="bg-indigo-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo />
          <SearchFeild search={search} setSearch={setSearch} />
          <Result result={result.length} />
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <>
      <h2 className="text-2xl font-bold">🍿usePopcorn</h2>
    </>
  );
}

function SearchFeild({ search, setSearch }) {
  return (
    <>
      <div className="w-1/4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Movies..."
          className="
    w-full
    rounded-lg
    bg-indigo-700
    px-4 py-2
    outline-none
    transition-all duration-300
    hover:border-gray-400
    hover:shadow-sm
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
  "
        />
      </div>
    </>
  );
}

function Result({ result }) {
  return (
    <>
      <p className="font-medium">Found {result} Results</p>
    </>
  );
}

export default Header;
