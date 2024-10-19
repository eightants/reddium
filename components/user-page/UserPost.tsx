import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import MarkdownView from "react-showdown";
import {
  getIntFromString,
  getTime,
  limitText,
  replaceGifv,
  unsplashCredits,
} from "../../functions/common";
import {
  BLURB_MAX,
  PLACEHOLDER_IMAGES,
  TITLE_MAX,
} from "../../functions/constants";
import { Post } from "../../interfaces";

const UserPost = ({
  title,
  selftext,
  subreddit_name_prefixed,
  created_utc,
  permalink,
  url,
  ups,
  thumbnail,
  num_comments,
}: Post) => (
  <div className="w-full mx-auto max-w-[80%] pb-2 mb-6 sm:mx-6 sm:w-auto">
    <div className="flex items-center text-sm">
      <div className="flex items-center main-black">
        <span>Published in </span>
        <Link href={`/${subreddit_name_prefixed.replace("u/", "r/u_")}`}>
          <span className="font-bold ml-1">{subreddit_name_prefixed}</span>
        </Link>
      </div>
      <span className="px-1 sub-link-grey">·</span>
      <span className="sub-link-grey">{getTime(created_utc)}</span>
    </div>
    <Link href={permalink}>
      <h1 className="text-4xl mt-3 font-bold tracking-tight leading-tight sm:text-2xl sm:leading-8">
        {title}
      </h1>
    </Link>
    <h3 className="sub-link-grey text-xl mt-1 font-normal tracking-tight sm:text-lg sm:mt-2 sm:leading-5">
      {limitText(selftext, TITLE_MAX)}
    </h3>
    <figure className="mt-8">
      {url &&
      (url.includes(".jpg") || url.includes(".png") || url.includes(".gif")) ? (
        <Image
          className="w-full shimmer-bg"
          src={replaceGifv(url)}
          alt={title}
          width={600}
          height={400}
          layout="responsive"
        />
      ) : thumbnail && thumbnail.includes("://") ? (
        <Image
          className="w-full shimmer-bg"
          src={thumbnail}
          alt={title}
          width={600}
          height={400}
          layout="responsive"
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
            height: "300px",
            backgroundSize: "cover",
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
            <Link href="https://unsplash.com" className="underline">
              Unsplash
            </Link>
          </div>
        ) : (
          "Original Image"
        )}
      </figcaption>
    </figure>
    <div className="mt-6 heading-font text-xl whitespace-pre-line main-black post-content sm:text-lg">
      <MarkdownView
        markdown={limitText(selftext, BLURB_MAX)}
        options={{ tables: true, emoji: true }}
      />
    </div>
    <div className="mt-2">
      <Link
        href={permalink}
        className="link-green-hover main-green tracking-normal text-sm"
      >{`Read more in ${subreddit_name_prefixed}`}</Link>
    </div>
    <div className="w-full mt-4 py-4 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center tracking-tight">
          <Image className="cursor-pointer w-6" src="/clap.svg" alt="Clap" width={24} height={24} />
          <div>
            <p className="ml-2">{ups}</p>
          </div>
        </div>
        <div className="ml-4 flex flex-row items-center tracking-tight">
          <Image className="cursor-pointer w-6 pt-1" src="/comment.svg" alt="Comment" width={24} height={24} />
          <div>
            <p className="ml-1">{num_comments}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center tracking-normal">
        <Image className="cursor-pointer" src="/save.svg" alt="Save" width={24} height={24} />
      </div>
    </div>
    <div className="sub-bottom-border mb-4 pt-6"></div>
  </div>
);

export default UserPost;
