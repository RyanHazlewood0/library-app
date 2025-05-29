"use client";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="flex justify-between fixed bottom-0 left-0 right-0 w-full p-3 z-10 font-semibold sm:w-[640px] sm:mr-auto sm:ml-auto bg-[#171717]">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/explore">Explore</Link>
      </div>
      <div>
        <Link href="/collection">Collection</Link>
      </div>
    </div>
  );
};

export default Nav;
