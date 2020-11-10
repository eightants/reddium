import React, { useState } from "react";
import Head from "next/head";
import { Props } from "../interfaces";

const PostLayout = ({ children, title }: Props) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="flex px-4 items-center justify-center max-width-main mx-auto z-50 h-16 lg:mx-12">
          <div className="flex-grow flex items-center">
            <div className="pr-4 h-6 flex flex-row items-center cursor-pointer">
              <a href="/">
                <img className="h-full" src="/medium_symbol.svg" />
              </a>
            </div>
          </div>
          <div className="items-center flex flex-row">
            <div className="flex flex-row items-center">
              <img
                className="cursor-pointer p-1 mr-2 ml-3"
                src="/search.svg"
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

export default PostLayout;
