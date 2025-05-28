import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

import { Book } from "../../types";

type LibraryContextType = {
  myCollection: Book[];
  setMyCollection: Dispatch<SetStateAction<Book[]>>;
};

type useLibraryContextProps = {
  children: React.ReactNode;
};

const LibraryContext = createContext<LibraryContextType | null>(null);

export const useLibraryContext = (): LibraryContextType => {
  const value = useContext(LibraryContext);
  if (!value) {
    throw new Error("useLibraryContext must be used within LibraryProvider");
  }
  return value;
};

export const LibraryProvider = ({ children }: useLibraryContextProps) => {
  const [myCollection, setMyCollection] = useState<Book[]>([]);

  return (
    <LibraryContext.Provider
      value={{
        myCollection,
        setMyCollection,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
