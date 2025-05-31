"use client";
import { useEffect, useState, use } from "react";

type BookProps = {
  params: Promise<{ id: string }>;
};

type BookData = {
  title: string;
  authors?: { name: string }[];
  description?: string | { value: string };
  covers?: number[];
};

export default function Book({ params }: BookProps) {
  const { id } = use(params);
  const [thisBookData, setThisBookData] = useState<null | BookData>(null);

  useEffect(() => {
    const getBookData = async () => {
      const response = await fetch(`https://openlibrary.org/works/${id}.json`);
      const data = await response.json();
      setThisBookData(data);
    };
    getBookData();
  }, []);

  return <>{thisBookData !== null && <p>{thisBookData.title}</p>}</>;
}
