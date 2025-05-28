"use client";
import Link from "next/link";

const MobileNav = () => {
  return (
    <div className="flex justify-between fixed bottom-0 left-0 right-0 w-full p-3 z-10 bg-gray-400 text-black font-semibold">
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

export default MobileNav;
