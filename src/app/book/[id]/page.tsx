"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BookType } from "../../../../types";
import { useBookContext } from "../../globalContext";

const Book = () => {
  const [thisBook, setThisBook] = useState<BookType | null>(null);
  const [thisAuthor, setThisAuthor] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const { id } = useParams();

  const { collection, setCollection } = useBookContext();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`https://openlibrary.org/works/${id}.json`);
      const data = await response.json();

      const description =
        typeof data.description === "string"
          ? data.description
          : data.description?.value || "No summary available..";

      const book: BookType = {
        title: data.title,
        cover: data.covers[0],
        author: data.authors[0].author.key.split("s/")[1],
        description: description,
        id: data.key.split("s/")[1],
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

  const addToCollection = () => {
    if (thisBook && !isAdded) {
      setCollection([...collection, thisBook]);
      setIsAdded(true);
    } else if (thisBook && isAdded) {
      const newData = collection.filter((book) => book.id !== thisBook.id);
      setCollection(newData);
      setIsAdded(false);
    }
  };

  return (
    <div className="inset-0 z-50 flex flex-col items-center gap-5 bg-black p-3 sm:w-[640px] sm: ml-auto sm:mr-auto overflow-auto">
      {thisBook && (
        <>
          <div className="flex w-full">
            <Link href={`/explore`} className="mr-auto">
              <button className="text-lg border rounded">
                <p className="pr-2 pl-2 mr-auto">←</p>
              </button>
            </Link>
          </div>
          <img
            src={`https://covers.openlibrary.org/b/id/${thisBook.cover}-L.jpg`}
            className=" pl-20 pr-20 pb-auto"
          />
          <div className="flex flex-col gap-3 text-center w-full">
            <h1 className="text-2xl font-bold">{thisBook?.title}</h1>
            <h2 className="text-lg font-semibold">{thisAuthor}</h2>
            <button
              className="border rounded p-2 cursor-pointer mx-auto"
              onClick={() => addToCollection()}
            >
              {isAdded ? "Remove from collection" : "Add to collection"}
            </button>
            <hr className="border-t border-gray-300 w-full" />
            <h3 className="text-xl font-semibold">Overview</h3>
            <p>{thisBook.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Book;
