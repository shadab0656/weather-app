import React from "react";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto justify-between flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="/"
            className="flex title-font font-medium items-center  text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl">Weather App</span>
          </a>
          <SearchBox />
        </div>
      </header>
    </div>
  );
}
