"use client";
import { useBookContext } from "../globalContext";

export default function Collection() {
  const { collection, setCollection } = useBookContext();
  return (
    <div className="flex flex-col items-center p-4">
      <ul className="flex flex-col gap-4">
        {collection.map((book) => (
          <li key={book.id} className="flex gap-3">
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
              alt={book.title}
              width="50px"
            />
            <div className="flex flex-col gap-2">
              <p>{book.title}</p>
              <p>{book.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
