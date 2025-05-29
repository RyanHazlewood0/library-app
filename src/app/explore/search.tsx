import { useState } from "react";

type SearchedBook = {
  id: string;
  title: string;
  author: string;
};

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<SearchedBook[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchData = async (e) => {
    e.preventDefault();
    setLoadingSearch(true);
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${searchValue}`
    );
    const data = await response.json();

    const updatedData: SearchedBook[] = data.docs.slice(0, 19).map((book) => {
      return {
        id: book.key,
        title: book.title,
        author: book.author_name,
      };
    });
    setSearchData(updatedData);
    if (updatedData) {
      setLoadingSearch(false);
    }
    setSearchValue("");
  };

  return (
    <>
      <form className="flex justify-between mb-3" onSubmit={fetchData}>
        <input
          placeholder="Search Title"
          value={searchValue}
          onChange={handleSearch}
          className="rounded p-1 bg-[#9CA3AF] text-black"
        />
        <button type="submit" className="border border-white p-1 rounded">
          Search
        </button>
      </form>
      {loadingSearch && <p className="text-lg">Loading...</p>}
      {searchData.length > 0 && (
        <ul className="flex flex-col gap-3">
          {searchData.map((book) => (
            <li
              key={book.id}
              className="border p-1 h-16 flex flex-col justify-between rounded-md"
            >
              <p className="truncate">{book.title}</p>
              <p className="truncate">({book.author})</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
