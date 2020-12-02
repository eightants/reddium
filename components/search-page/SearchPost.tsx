import Link from "next/link";
import React from "react";
import MarkdownView from "react-showdown";
import {
  getIntFromString,
  getTime,
  limitText,
  replaceGifv
} from "../../functions/common";
import {
  DESC_MAX,
  PLACEHOLDER_IMAGES,
  TITLE_MAX
} from "../../functions/constants";
import { Post } from "../../interfaces";

const SearchPost = ({
  author,
  title,
  selftext,
  subreddit_name_prefixed,
  created_utc,
  permalink,
  url,
  ups,
  thumbnail,
  num_comments
}: Post) => (
  <div className="w-full max-w-600 pb-2 mb-4 sm:mx-0 sm:w-auto">
    <div className="w-full mt-4 flex flex-row justify-between items-center sm:block">
      <div className="items-center flex">
        <div
          className="rounded-full"
          style={{
            backgroundImage: `url('/avatars/avatar_${getIntFromString(
              author,
              18
            )}.jpg')`,
            width: "36px",
            height: "36px",
            backgroundSize: "cover"
          }}
        ></div>
        <div className="pl-3 text-sm">
          <div className="flex items-center main-black">
            <Link href={`/user/${author}`}>
              <span className="main-green font-semibold cursor-pointer">{author}</span>
            </Link>
            <span className="ml-1 sub-link-grey">in </span>
            <Link href={`/${subreddit_name_prefixed}`}>
              <span className="ml-1 main-green font-semibold cursor-pointer">
                {subreddit_name_prefixed}
              </span>
            </Link>
          </div>
          <div className="tracking-5 text-sm sub-opacity-68">
            <span>{getTime(created_utc)}</span>
          </div>
        </div>
      </div>
    </div>
    <a href={permalink}>
      <h1 className="text-3xl mt-6 font-normal leading-tight sm:text-2xl sm:leading-9">
        {limitText(title, DESC_MAX)}
      </h1>
    </a>
    <figure className="mt-8">
      {url &&
      (url.includes(".jpg") || url.includes(".png") || url.includes(".gif")) ? (
        <img
          className="w-full shimmer-bg max-h-200"
          src={replaceGifv(url)}
          width="100%"
        />
      ) : thumbnail && thumbnail.includes("://") ? (
        <img
          className="w-full shimmer-bg max-h-200"
          src={thumbnail}
          width="100%"
        />
      ) : (
        <div
          className="w-full shimmer-bg"
          style={{
            backgroundImage: `url(/placeholders/${
              PLACEHOLDER_IMAGES[
                getIntFromString(title, PLACEHOLDER_IMAGES.length)
              ] || "default.jpg"
            })`,
            height: "200px",
            backgroundSize: "cover"
          }}
        ></div>
      )}
    </figure>
    <div className="mt-6 heading-font text-lg whitespace-pre-line main-black post-content sm:text-lg">
      <MarkdownView
        markdown={limitText(selftext, TITLE_MAX)}
        options={{ tables: true, emoji: true }}
      />
    </div>
    <div className="mt-2">
      <a
        href={permalink}
        className="link-black-hover sub-link-grey tracking-normal text-sm"
      >
        {"Read more"}
      </a>
    </div>
    <div className="w-full mt-4 py-4 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center tracking-tight">
          <img className="cursor-pointer w-6" src="/clap.svg" />
          <div>
            <p className="ml-2 sub-link-grey text-sm">{ups}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center tracking-normal">
        <div>
          <p className="ml-1 text-sm sub-link-grey mr-2">{`${num_comments} responses`}</p>
        </div>
        <img className="cursor-pointer" src="/save.svg" />
      </div>
    </div>
    <div className="sub-bottom-border mb-4 pt-6"></div>
  </div>
);

export default SearchPost;
