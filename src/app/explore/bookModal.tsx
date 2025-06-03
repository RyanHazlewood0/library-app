import { SearchedBook } from "./search";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

interface BookModalProps {
  selectedBook: SearchedBook;
  setSelectedBook: Dispatch<SetStateAction<null | SearchedBook>>;
}

const BookModal = ({ selectedBook, setSelectedBook }: BookModalProps) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await fetch(
        `https://openlibrary.org/works/${selectedBook.id}.json`
      );
      const data = await response.json();
      setSummary(data);
    };

    fetchSummary();
  }, [selectedBook]);

  return (
    <div className=" fixed inset-0 z-50 flex flex-col items-center gap-5 bg-black p-3 sm:w-[640px] sm: ml-auto sm:mr-auto">
      <button
        className=" ml-auto text-lg pointer-hover"
        onClick={() => setSelectedBook(null)}
      >
        X
      </button>
      <img
        src={`https://covers.openlibrary.org/b/olid/${selectedBook.cover_i}-L.jpg`}
        className=" pl-20 pr-20 pb-auto"
      />
      <div className="flex flex-col gap-3 text-center w-full">
        <h1 className="text-2xl font-bold">{selectedBook.title}</h1>
        <h2 className="text-lg font-semibold">{selectedBook.author}</h2>
        <hr className="border-t border-gray-300 w-full" />
        <h3 className="text-xl font-semibold">Overview</h3>
        {summary ? <p>{summary.description}</p> : <p>No summary available</p>}
      </div>
    </div>
  );
};

export default BookModal;
