"use client";
import { createContext, useContext } from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { BookType } from "../../types";

type BookContextType = {
  collection: BookType[];
  setCollection: Dispatch<SetStateAction<BookType[]>>;
};

const BookContext = createContext<BookContextType | null>(null);

export const useBookContext = (): BookContextType => {
  const value = useContext(BookContext);
  if (value === null) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return value;
};

type useBookContextProps = {
  children: React.ReactNode;
};

export const BookProvider = ({ children }: useBookContextProps) => {
  const [collection, setCollection] = useState<BookType[]>([]);

  return (
    <BookContext.Provider
      value={{
        collection,
        setCollection,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
