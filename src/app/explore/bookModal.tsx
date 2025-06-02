import { SearchedBook } from "./search";
import { Dispatch, SetStateAction } from "react";

interface BookModalProps {
  selectedBook: SearchedBook;
  setSelectedBook: Dispatch<SetStateAction<null | SearchedBook>>;
}

const BookModal = ({ selectedBook, setSelectedBook }: BookModalProps) => {
  return (
    <div className=" fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-3">
      <button
        className="mb-auto ml-auto text-lg pointer-hover"
        onClick={() => setSelectedBook(null)}
      >
        X
      </button>
      <img
        src={`https://covers.openlibrary.org/b/olid/${selectedBook.cover_i}-S.jpg`}
      />
      <p>{selectedBook.title}</p>
      <p>{selectedBook.author}</p>
    </div>
  );
};

export default BookModal;
