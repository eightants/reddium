import React, { useState } from "react";
import { Props } from "../interfaces";
import TitleHead from "./TitleHead";

const Layout = ({ children, title }: Props) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div>
      <TitleHead title={title}/>
      <header>
        <nav className="flex items-center justify-center max-width-main mx-auto z-50 h-16 my-6 lg:mx-12">
          <div className="flex-grow flex items-center">
            <a href="/">
              <div className="pr-4 nav-img h-8 flex flex-row items-center cursor-pointer">
                <img className="h-full" src="reddium_symbol.svg" />
                <h1 className="ml-4 site-name text-3xl tracking-tighter">
                  Reddium
                </h1>
              </div>
            </a>
            <div className="pl-4">
              <h1 className="font-bold text-lg leading-6 nav-greeting">
                Good morning
              </h1>
            </div>
          </div>
          <div className="items-center flex flex-row">
            <div className="flex flex-row items-center">
              <img
                className="cursor-pointer p-1 mr-2 ml-3"
                src="search.svg"
                onClick={() => setShowSearch(!showSearch)}
              />
              {showSearch ? (
                <input
                  className="search-bar main-black text-base"
                  placeholder="Search Reddit"
                  value=""
                />
              ) : (
                ""
              )}
            </div>
            <button className="my-4 p-1 px-3 text-sm cursor-pointer max-w-full btn-outline-black rounded">
              Get Started
            </button>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
