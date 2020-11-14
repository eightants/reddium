import Link from "next/link";
import React from "react";
import MarkdownView from "react-showdown";
import {
  getIntFromString,
  getTime,
  limitText,
  replaceGifv,
  unsplashCredits
} from "../../functions/common";
import { PLACEHOLDER_IMAGES, TITLE_MAX } from "../../functions/constants";
import { Post } from "../../interfaces";

const PostContent = ({
  title,
  selftext,
  subreddit_name_prefixed,
  created_utc,
  author,
  url,
  ups,
  thumbnail,
  num_comments
}: Post) => (
  <div className="w-full mx-auto max-w-600 pb-2 mt-6 sm:mx-6 sm:w-auto">
    <h1 className="heading-font text-5xl font-normal leading-tight sm:text-3xl sm:leading-9">
      {title}
    </h1>
    <h3 className="sub-link-grey text-xl sm:text-lg sm:mt-2 sm:leading-5">
      {limitText(selftext, TITLE_MAX)}
    </h3>
    <div className="w-full mt-4 flex flex-row justify-between items-center sm:block">
      <div className="items-center sub-opacity-54 hidden sm:flex my-4">
        <a
          className="w-8/12 truncate hover:underline font-semibold"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      </div>
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
      <div className="items-center flex sub-opacity-54 sm:hidden">
        <a
          className="w-48 truncate hover:underline font-semibold"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      </div>
    </div>
    <figure className="mt-16">
      {url && (url.includes(".jpg") || url.includes(".png") || url.includes(".gif")) ? (
        <img
          className="w-full shimmer-bg"
          src={replaceGifv(url)}
          width="100%"
        />
      ) : thumbnail && thumbnail.includes("://") ? (
        <img className="w-full shimmer-bg" src={thumbnail} width="100%" />
      ) : (
        <div
          className="w-full shimmer-bg"
          style={{
            backgroundImage: `url(/placeholders/${
              PLACEHOLDER_IMAGES[
                getIntFromString(title, PLACEHOLDER_IMAGES.length)
              ] || "default.jpg"
            })`,
            height: "300px",
            backgroundSize: "cover"
          }}
        ></div>
      )}
      <figcaption className="mt-2 mx-auto sub-opacity-54 text-center text-sm">
        {url &&
        !(url.includes(".jpg") || url.includes(".gif")) &&
        PLACEHOLDER_IMAGES[
          getIntFromString(title, PLACEHOLDER_IMAGES.length)
        ] &&
        (!thumbnail || !thumbnail.includes("://")) ? (
          <div>
            Photo by{" "}
            <span className="capitalize underline">
              {unsplashCredits(
                PLACEHOLDER_IMAGES[
                  getIntFromString(title, PLACEHOLDER_IMAGES.length)
                ]
              )}
            </span>{" "}
            on{" "}
            <a href="https://unsplash.com" className="underline">
              Unsplash
            </a>
          </div>
        ) : (
          "Original Image"
        )}
      </figcaption>
    </figure>
    <div className="mt-12 heading-font text-xl whitespace-pre-line main-black post-content sm:text-lg">
      <MarkdownView
        markdown={selftext}
        options={{ tables: true, emoji: true }}
      />
    </div>
    <div className="w-full mt-4 pt-4 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center sub-opacity-54 tracking-tight">
          <img className="cursor-pointer w-8" src="/clap.svg" />
          <div>
            <p className="ml-2">{`${ups} claps`}</p>
          </div>
        </div>
        <div className="ml-4 flex flex-row items-center sub-opacity-54 tracking-tight">
          <img className="cursor-pointer w-8 pt-1" src="/comment.svg" />
          <div>
            <p className="ml-1">{num_comments}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center tracking-normal">
        <img className="cursor-pointer" src="/save.svg" />
      </div>
    </div>
  </div>
);

export default PostContent;
