import { useState } from "react";
import Link from "next/link";

export type SearchedBook = {
  id: string;
  title: string;
  author: string;
  cover_i: string;
};

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<SearchedBook[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [radioSelected, setRadioSelected] = useState("title");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchData = async (e) => {
    e.preventDefault();
    setLoadingSearch(true);

    const endPoint =
      radioSelected === "title"
        ? `https://openlibrary.org/search.json?title=${searchValue}`
        : `https://openlibrary.org/search.json?author=${searchValue}`;
    const response = await fetch(endPoint);
    const data = await response.json();

    const updatedData: SearchedBook[] = data.docs.slice(0, 29).map((book) => {
      return {
        id: book.key.split("s/")[1],
        title: book.title,
        author: book.author_name?.[0]
          ? book.author_name[0]
          : "Author name not available",
        cover_i: book.cover_edition_key,
      };
    });
    setSearchData(updatedData);
    if (updatedData) {
      setLoadingSearch(false);
    }
    setSearchValue("");
  };

  const handleRadioSelect = () => {
    if (radioSelected === "title") {
      setRadioSelected("author");
    } else if (radioSelected === "author") {
      setRadioSelected("title");
    }
  };

  return (
    <div className=" sm:w-[640px] sm: ml-auto sm:mr-auto">
      <form
        className="flex justify-between mb-3 sm:w-[640px] sm:ml-auto md:mr-auto"
        onSubmit={fetchData}
      >
        <button className="text-lg border rounded">
          <p className="pr-2 pl-2">←</p>
        </button>
        <div className="flex gap-3 justify-end w-full">
          <div className="flex flex-col" onChange={handleRadioSelect}>
            <div className="flex ">
              <input
                type="radio"
                id="title"
                name="author_or_title"
                value="title"
                defaultChecked
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="flex">
              <input
                type="radio"
                id="author"
                name="author_or_title"
                value="author"
              />
              <label htmlFor="author">Author</label>
            </div>
          </div>
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
      {loadingSearch && <p className="text-lg ml-auto mr-auto">Loading...</p>}
      {searchData.length > 0 && (
        <ul className="flex flex-col gap-3">
          {searchData.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <li className="border p-1 h-16 flex justify-between rounded-md w-full cursor-pointer">
                <div className="w-[80%]">
                  <p className="truncate">{book.title}</p>
                  <p className="truncate">({book.author})</p>
                </div>
                {book.cover_i && (
                  <img
                    className="w-[58px]"
                    src={`https://covers.openlibrary.org/b/olid/${book.cover_i}-S.jpg`}
                  />
                )}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
