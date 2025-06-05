"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type BookType = {
  title: string;
  cover: number;
  author: number;
};

const Book = () => {
  const [thisBook, setThisBook] = useState<BookType | null>(null);
  const [thisAuthor, setThisAuthor] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`https://openlibrary.org/works/${id}.json`);
      const data = await response.json();
      const book = {
        title: data.title,
        cover: data.covers[0],
        author: data.authors[0].author.key.split("s/")[1],
      };
      setThisBook(book);
    };

    fetchBook();
  }, []);

  useEffect(() => {
    if (thisBook) {
      const fetchAuthor = async () => {
        const response = await fetch(
          `https://openlibrary.org/authors/${thisBook.author}.json`
        );
        const data = await response.json();
        setThisAuthor(data.name);
      };
      fetchAuthor();
    }
  }, [thisBook]);

  return (
    <div className=" fixed inset-0 z-50 flex flex-col items-center gap-5 bg-black p-3 sm:w-[640px] sm: ml-auto sm:mr-auto">
      {thisBook && (
        <>
          <img
            src={`https://covers.openlibrary.org/b/id/${thisBook.cover}-L.jpg`}
            className=" pl-20 pr-20 pb-auto"
          />
          <div className="flex flex-col gap-3 text-center w-full">
            <h1 className="text-2xl font-bold">{thisBook?.title}</h1>
            <h2 className="text-lg font-semibold">{thisAuthor}</h2>
            <hr className="border-t border-gray-300 w-full" />
            <h3 className="text-xl font-semibold">Overview</h3>
            <p>summary</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Book;
