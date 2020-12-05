import { zipObject } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { getIntFromString, getTime, limitText } from "../../functions/common";
import { DESC_MAX, REDIRECT_URI } from "../../functions/constants";
import { DropdownProps, Props } from "../../interfaces";

export const MidContainer = ({ children }: Props) => (
  <div className="mid-container px-4 sm:px-0">{children}</div>
);

const ProfileOptions = () => {
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
    <div className="main-black relative">
      <div
        className="main-border w-10 h-10 sm:h-8 sm:w-8 flex justify-between items-center rounded-full ml-4 cursor-pointer"
        style={{
          backgroundImage: `url("/avatar.svg")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        onClick={() => setShowDropdown(!showDropdown)}
      ></div>
      {showDropdown ? (
        <div
          className="dropdown-select absolute w-48 mt-6 z-20 right-0 left-auto rounded sub-text"
          ref={dropdown}
        >
          <a
            className="my-1 px-5 p-2 cursor-pointer link-black-hover block"
            href="/me"
          >
            View Profile
          </a>
          <a
            className="my-1 px-5 p-2 cursor-pointer link-black-hover block"
            href="/logout"
          >
            Sign out
          </a>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export const Dropdown = ({
  id,
  dataObj,
  paramKey,
  paramVal,
  updateParams
}: DropdownProps) => {
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
          className="dropdown-select w-48 max-w-full absolute z-10"
          ref={dropdown}
        >
          {zipObject(paramKey, paramVal)[id].map((value: string, ind) => (
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
          ))}
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
    <a className="link-black-hover" href={`/${subreddit_name_prefixed}`}>
      {subreddit_name_prefixed}
    </a>
  </div>
);

export const NavMenu = ({ token = "" }: any) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const newSearch = () => (window.location.href = `/search/?q=${searchTerm}`);
  return (
    <div className="items-center flex flex-row h-full justify-end">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && newSearch()}
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
            className="h-10 cursor-pointer p-1 ml-2 sub-opacity-68 link-black-hover hidden md:block"
            src="/github.svg"
          />
        </a>
      </div>
      <a
        href="https://github.com/eightants/reddium/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="md:hidden my-4 ml-4 p-1 px-3 sub-opacity-68 link-black-hover text-sm cursor-pointer max-w-full btn-outline-black rounded">
          Star on GitHub
        </button>
      </a>
      {token != "" ? (
        <ProfileOptions />
      ) : (
        <a
          href={`https://www.reddit.com/api/v1/authorize.compact?client_id=DT8MZ0k_rAtJ8w&response_type=code&state=testing&redirect_uri=${REDIRECT_URI}&duration=temporary&scope=${encodeURIComponent(
            "read vote save identity subscribe"
          )}`}
        >
          <button className="sm:hidden my-4 ml-4 p-1 px-3 text-sm cursor-pointer max-w-full btn-black text-white outline-1px rounded">
            Login
          </button>
        </a>
      )}
    </div>
  );
};

export const SubredditCard = ({
  display_name,
  public_description,
  url,
  icon_img
}: any) => (
  <div className="pb-4 mb-4 flex flex-row w-full sub-bottom-border">
    <a href={url}>
      <div
        className="rounded"
        style={{
          backgroundImage: `url(${
            icon_img ? icon_img : "/placeholders/default.jpg"
          })`,
          width: "60px",
          height: "60px",
          backgroundSize: "cover"
        }}
      >
        {" "}
      </div>
    </a>
    <div className="pl-4 flex-grow break-words overflow-hidden">
      <a className="heading-text text-lg" href={url}>
        <h3 className="mb-1 font-normal">{display_name}</h3>
      </a>
      <p className="text-sm mb-1">{limitText(public_description, DESC_MAX)}</p>
    </div>
    <a href={url}>
      <button className="px-4 py-1 ml-5 cursor-pointer text-center rounded btn-outline-green">
        Visit
      </button>
    </a>
  </div>
);

export const UserCard = ({ name, icon_img }: any) => (
  <div className="pb-4 mb-4 flex flex-row w-full sub-bottom-border">
    <a href={`/user/${name}`}>
      <div
        className="rounded-full"
        style={{
          backgroundImage: `url(${
            icon_img && !icon_img.includes("styles")
              ? icon_img
              : "/avatars/avatar_" + getIntFromString(name, 18) + ".jpg"
          })`,
          width: "60px",
          height: "60px",
          backgroundSize: "cover"
        }}
      >
        {" "}
      </div>
    </a>
    <div className="pl-4 flex-grow break-words overflow-hidden">
      <a className="heading-text text-lg" href={`/user/${name}`}>
        <h3 className="mb-1 font-normal">{name}</h3>
      </a>
      <p className="text-sm mb-1">User</p>
    </div>
    <a href={`/user/${name}`}>
      <button className="px-4 py-1 ml-5 cursor-pointer text-center rounded btn-outline-green">
        Visit
      </button>
    </a>
  </div>
);
