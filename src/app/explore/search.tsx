import { useState } from "react";

type SearchedBook = {
  id: string;
  title: string;
  author: string;
};

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<SearchedBook[]>([]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${searchValue}`
    );
    const data = await response.json();

    const updatedData: SearchedBook[] = data.docs.slice(0, 14).map((book) => {
      return {
        id: book.key,
        title: book.title,
        author: book.author_name,
      };
    });
    setSearchData(updatedData);
  };

  return (
    <>
      <div className="flex justify-between mb-3">
        <input
          placeholder="Search title"
          value={searchValue}
          onChange={handleSearch}
          className="rounded p-1"
        />
        <button onClick={fetchData} className="border border-white p-1 rounded">
          Search
        </button>
      </div>

      {searchData.length > 0 && (
        <ul>
          {searchData.map((book) => (
            <div key={book.id}>
              <li>
                <p>{book.title}</p>
                <p>{book.author}</p>
              </li>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
