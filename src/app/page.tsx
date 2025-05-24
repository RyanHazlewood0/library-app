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

  console.log(searchData);

  return (
    <div>
      <input
        placeholder="Search title"
        value={searchValue}
        onChange={handleSearch}
      />
      <button onClick={fetchData}>Search</button>
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
    </div>
  );
}
