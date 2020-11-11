import Link from "next/link";
import React from "react";
import { getIntFromString, getTime, limitText } from "../../functions/common";
import { PLACEHOLDER_IMAGES, TITLE_MAX } from "../../functions/constants";
import { Post } from "../../interfaces";

const PostContent = ({
  title,
  selftext,
  subreddit_name_prefixed,
  created_utc,
  author,
  url,
  ups
}: Post) => (
  <div className="w-full mx-auto max-w-600 pb-2 mt-6 sm:mx-6 sm:w-auto">
    <h1 className="heading-font text-5xl font-normal leading-tight sm:text-3xl sm:leading-9">
      {title}
    </h1>
    <h3 className="sub-link-grey text-xl sm:text-lg sm:mt-2 sm:leading-5">
      {limitText(selftext, TITLE_MAX)}
    </h3>
    <div className="w-full mt-4 flex flex-row justify-between items-center">
      <div className="items-center flex">
        <div
          className="rounded-full"
          style={{
            backgroundImage: `url('/avatars/avatar (${getIntFromString(
              author,
              18
            )}).jpg')`,
            width: "48px",
            height: "48px",
            backgroundSize: "cover"
          }}
        ></div>
        <div className="pl-3">
          <Link href="/">
            <span className="main-black text-md hover:underline cursor-pointer sm:text-sm">
              {author}
            </span>
          </Link>
          <div className="tracking-5 text-sm sub-opacity-68">
            <span>{getTime(created_utc)}</span>
            <span className="px-1">·</span>
            <span>{subreddit_name_prefixed}</span>
          </div>
        </div>
      </div>
    </div>
    <figure className="mt-16">
      <div
        className="w-full shimmer-bg"
        style={{
          backgroundImage:
            "url(" +
            (url && url.includes(".jpg")
              ? url
              : `/placeholders/${
                  PLACEHOLDER_IMAGES[
                    getIntFromString(title, PLACEHOLDER_IMAGES.length)
                  ] || "default.jpg"
                }`) +
            ")",
          height: "300px",
          backgroundSize: "cover"
        }}
      ></div>
      <figcaption className="mt-2 mx-auto sub-opacity-54 text-center text-sm">
        Photo by{" "}
      </figcaption>
    </figure>
    <div className="mt-12 heading-font text-xl whitespace-pre-line main-black sm:text-lg">
      {selftext}
    </div>
    <div className="w-full mt-4 pt-4 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center sub-opacity-54 tracking-tight">
        <img className="cursor-pointer w-8" src="/clap.svg" />
        <div>
          <p className="ml-2">{`${ups} claps`}</p>
        </div>
      </div>
      <div className="flex flex-row items-center tracking-normal">
        <img className="cursor-pointer" src="/save.svg" />
      </div>
    </div>
  </div>
);

export default PostContent;
