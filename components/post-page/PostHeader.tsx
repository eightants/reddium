import React from "react";

const PostHeader = ({ subreddit }: any) => (
  <header className="w-full blue-bg text-white">
    <div className="flex px-4 max-width-main mx-auto flex-row items-center lg:w-auto lg:mx-12 sm:mx-6 sm:px-0">
      <div>
        <a href={`/r/${subreddit}`}>
          <h1 className="tracking-wide text-white heading-font">{`r/${subreddit}`}</h1>
        </a>
      </div>
      <nav className="flex justify-between items-center flex-row leading-4 flex-grow py-2">
        <div></div>
        <div>
          <button className="my-2 p-1 px-3 text-sm cursor-pointer max-w-full btn-outline-white rounded">
            Follow
          </button>
        </div>
      </nav>
    </div>
  </header>
);

export default PostHeader;
