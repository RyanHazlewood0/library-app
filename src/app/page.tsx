"use client";
import { useState } from "react";

type SearchedBook = {
  id: string;
  title: string;
  author: string;
};

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<SearchedBook[]>([]);
  const [navButtonSelected, setNavButtonSelected] = useState("Home");

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

  const selectNavButton = (string: string) => {
    setNavButtonSelected(string);
  };

  return (
    <div className="p-3">
      {navButtonSelected === "Explore" && (
        <div className="flex justify-between mb-3">
          <input
            placeholder="Search title"
            value={searchValue}
            onChange={handleSearch}
            className="rounded p-1"
          />
          <button
            onClick={fetchData}
            className="border border-white p-1 rounded"
          >
            Search
          </button>
        </div>
      )}

      {searchData.length > 0 && (
        <ul>
          {searchData.map((book) => (
            <li key={book.id}>
              <p>{book.title}</p>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between fixed bottom-0 left-0 right-0 w-full p-3 z-10 bg-gray-400 text-black font-semibold">
        <div onClick={() => selectNavButton("Home")}>Home</div>
        <div onClick={() => selectNavButton("Explore")}>Explore</div>
        <div onClick={() => selectNavButton("Collection")}>Collection</div>
      </div>
    </div>
  );
}
