import { useState } from "react";
import Link from "next/link";

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
      <form
        className="flex justify-between mb-3 sm:w-[640px] sm:ml-auto md:mr-auto"
        onSubmit={fetchData}
      >
        <button className="text-lg border rounded">
          <p className="pr-2 pl-2">←</p>
        </button>
        <div className="flex gap-3 justify-end w-full">
          <input
            placeholder="Search Title"
            value={searchValue}
            onChange={handleSearch}
            className="rounded p-1 bg-[#9CA3AF] text-black"
          />
          <button type="submit" className="border border-white p-1 rounded">
            Search
          </button>
        </div>
      </form>
      {loadingSearch && <p className="text-lg">Loading...</p>}
      {searchData.length > 0 && (
        <ul className="flex flex-col gap-3 sm:w-[640px] sm: ml-auto sm:mr-auto">
          {searchData.map((book) => (
            <Link href="/book" key={book.id}>
              <li className="border p-1 h-16 flex flex-col justify-between rounded-md w-full">
                <p className="truncate">{book.title}</p>
                <p className="truncate">({book.author})</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
