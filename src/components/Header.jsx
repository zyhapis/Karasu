// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext, useRef } from "react";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import logo from "../assets/logo.png";
import darkLogo from "../assets/logo-dark.png";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const { isDark, setIsDark } = useContext(DataContext);

  const [searchIcon, setSearchIcon] = useState(false);
  const [navStatus, setNavStatus] = useState(false);
  const [query, setQuery] = useState("");

  const headerRef = useRef();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY >= 30) {
        headerRef.current.classList.add("lg:backdrop-blur-md");
      } else {
        headerRef.current.classList.remove("lg:backdrop-blur-md");
      }
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative font-montserrat lg:fixed lg:top-0 lg:left-0 lg:w-full lg:z-10 lg:transition-all lg:duration-300"
      style={
        location.pathname.includes("chapter") ? { position: "relative" } : {}
      }
    >
      <section className="w-full max-w-[1400px] px-5 py-3 flex justify-between items-center gap-5 bg-white dark:bg-background-dark sm:px-7 md:px-10 lg:bg-transparent lg:dark:bg-transparent lg:px-16 lg:mx-auto lg:justify-center lg:py-5 lg:gap-3">
        <button
          className="z-10 rounded-md hover:bg-[whitesmoke] dark:hover:bg-[#333] lg:hidden"
          onClick={() => setNavStatus((prev) => !prev)}
        >
          {!navStatus ? (
            <Bars3Icon className="h-8 w-8 dark:stroke-white" />
          ) : (
            <XMarkIcon className="h-8 w-8 dark:stroke-white" />
          )}
        </button>

        <Link to="/" className="flex justify-center z-10 lg:hidden">
          <img
            src={isDark ? darkLogo : logo}
            alt="Weebix"
            className="w-2/5 max-w-[300px] md:max-w-[375px]"
          />
        </Link>

        <Link to="/" className="hidden lg:block w-fit z-10">
          <img
            src={window.location.pathname === "/" || isDark ? darkLogo : logo}
            alt="Weebix"
            className="w-1/4"
          />
        </Link>

        <form
          className="hidden lg:flex gap-1 z-10 w-4/5"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="search" className="absolute -left-[10000px]">
            Search anime or manga...
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search anime or manga..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-1 rounded-full grow text-sm lg:outline lg:outline-1 lg:outline-black lg:focus:outline-[3px]"
          />

          <Link to={`search/${query}`}>
            <button
              type="submit"
              className="bg-accent px-3 py-1 rounded-full hover:brightness-90 text-sm"
            >
              Search
            </button>
          </Link>
        </form>

        <Link
          to={"settings"}
          className="hidden lg:block z-10"
          title="Settings"
          style={
            window.location.pathname === "/" || isDark
              ? { color: "white" }
              : { color: "#1a1a1a" }
          }
        >
          <svg
            className="w-10 h-10 text-accent hover:brightness-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
          </svg>
        </Link>

        <button
          onClick={() => setIsDark((prev) => !prev)}
          className={`rounded-full w-12 h-12 flex items-center justify-center p-2 bg-white dark:bg-background-dark dark:text-white transition-all duration-300 ${
            isDark ? "dark:justify-end" : ""
          }`}
        >
          <div className="rounded-full w-8 h-8 bg-white dark:bg-background-dark dark:text-white flex items-center justify-center">
            {isDark ? (
              <MoonIcon className="w-6 h-6" />
            ) : (
              <SunIcon className="w-6 h-6" />
            )}
          </div>
        </button>

        <button
          className="z-10 rounded-md hover:bg-[whitesmoke] dark:hover:bg-[#333] lg:hidden"
          onClick={() => setSearchIcon((prev) => !prev)}
        >
          <MagnifyingGlassIcon className="h-7 w-7 dark:stroke-white" />
        </button>

        <Nav navStatus={navStatus} setNavStatus={setNavStatus} />

        {searchIcon && (
          <>
            <form
              className="absolute w-[92%] h-[90%] top-[5%] left-[4%] bg-white flex gap-3 items-center font-nunito z-[11] dark:bg-background-dark"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="search" className="absolute -left-[10000px]">
                Search anime or manga...
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search anime or manga"
                autoFocus="on"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="grow rounded-lg px-3 py-1 border border-background-dark"
              />

              <Link
                to={`search/${query}`}
                onClick={() => setSearchIcon((prev) => !prev)}
              >
                <button
                  type="submit"
                  className="bg-accent px-3 py-1 rounded-md hover:brightness-90"
                >
                  Search
                </button>
              </Link>

              <button
                type="button"
                onClick={() => setSearchIcon((prev) => !prev)}
                className="rounded-md hover:bg-[whitesmoke] dark:hover:bg-[#333]"
              >
                <XMarkIcon className="h-6 w-6 dark:stroke-white" />
              </button>
            </form>
          </>
        )}
      </section>
    </header>
  );
};

export default Header;
