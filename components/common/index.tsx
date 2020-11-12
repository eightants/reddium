import { zipObject } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { getTime } from "../../functions/common";
import {
  POPULAR_PARAM_KEY,
  POPULAR_PARAM_VALUES
} from "../../functions/constants";
import { DropdownProps, Props } from "../../interfaces";

export const MidContainer = ({ children }: Props) => (
  <div className="mid-container px-4 sm:px-0">{children}</div>
);

export const Dropdown = ({ id, dataObj, updateParams }: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(e: any) {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  return (
    <div className="w-full main-black">
      <button
        className="main-border mt-4 px-5 py-2 flex justify-between items-center w-48 max-w-full"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="w-full flex flex-row justify-between items-center">
          <div>{dataObj[id]}</div>
          <div>
            <img className="ml-3" src="/down_arrow.svg" />
          </div>{" "}
        </div>
      </button>
      {showDropdown ? (
        <div
          className="dropdown-select w-48 max-w-full absolute"
          ref={dropdown}
        >
          {zipObject(POPULAR_PARAM_KEY, POPULAR_PARAM_VALUES)[id].map(
            (value: string, ind) => (
              <div
                className="my-1 px-4 mx-1 p-2 cursor-pointer"
                key={ind}
                onClick={() => {
                  updateParams({ ...dataObj, [id]: value });
                  setShowDropdown(false);
                }}
              >
                {value}
              </div>
            )
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export const PostMetadata = ({
  className,
  created_utc,
  subreddit_name_prefixed
}: any) => (
  <div className={className}>
    <span>{getTime(created_utc)}</span>
    <span className="px-2">·</span>
    <a className="link-black-hover" href={subreddit_name_prefixed}>
      {subreddit_name_prefixed}
    </a>
  </div>
);

export const NavMenu = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="items-center flex flex-row h-full">
      <div className="flex flex-row items-center justify-end h-full">
        <img
          className="cursor-pointer p-1 mr-2 ml-3 sub-opacity-68 link-black-hover"
          src="/search.svg"
          onClick={() => setShowSearch(!showSearch)}
        />
        {showSearch ? (
          <input
            className="search-bar main-black text-base sm:w-3/12"
            placeholder="Search Reddit"
            value=""
          />
        ) : (
          ""
        )}
        <a
          href="https://ko-fi.com/eightants"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-8 cursor-pointer p-1 ml-2 sub-opacity-68 link-black-hover"
            src="/coffee.svg"
          />
        </a>
        <a
          href="https://github.com/eightants/reddium/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-10 cursor-pointer p-1 ml-2 sub-opacity-68 link-black-hover hidden sm:block"
            src="/github.svg"
          />
        </a>
      </div>
      <a
        href="https://github.com/eightants/reddium/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="sm:hidden my-4 ml-4 p-1 px-3 sub-opacity-68 link-black-hover text-sm cursor-pointer max-w-full btn-outline-black rounded">
          Star on GitHub
        </button>
      </a>
    </div>
  );
};
