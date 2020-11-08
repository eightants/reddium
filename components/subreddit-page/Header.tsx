import React from "react";

const Header = ({ subreddit }: any) => (
  <header className=" w-full about-bg">
    <div className=" flex max-width-sub mx-auto flex-row items-center">
      <div>
        <h1 className="tracking-wide">{`r/${subreddit}`}</h1>
      </div>
      <nav className="flex justify-between items-center flex-row leading-4 flex-grow py-4">
        <div></div>
        <div>
          <button className="my-4 p-1 px-3 text-sm cursor-pointer max-w-full btn-outline-black rounded">
            Follow
          </button>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
