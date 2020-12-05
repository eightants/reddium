import Link from "next/link";
import React, { useState } from "react";
import MarkdownView from "react-showdown";
import {
  getEmbedLink,
  getIntFromString,
  getTime,
  isImage,
  isVideo,
  limitText,
  replaceGifv,
  unsplashCredits
} from "../../functions/common";
import { PLACEHOLDER_IMAGES, TITLE_MAX } from "../../functions/constants";
import { Post } from "../../interfaces";
import { sendSave, sendUnsave, upvote } from "../../pages/api/posts";

const PostContent = ({
  title,
  selftext,
  subreddit_name_prefixed,
  created_utc,
  author,
  url,
  ups,
  name,
  likes,
  saved,
  thumbnail,
  num_comments,
  token = ""
}: Post) => {
  const [upvoted, setUpvoted] = useState(likes || false);
  const [isSaved, setIsSaved] = useState(saved);
  const castVote = (dir: number) => {
    if (token != "") {
      upvote({ postid: name, dir: dir, token }).then(() => {
        if (dir == 0) {
          setUpvoted(false);
        } else {
          setUpvoted(true);
        }
      });
    }
  };
  const savePost = (dir: number) => {
    if (token != "") {
      if (dir == 1) {
        sendSave({ postid: name, token }).then(() => {
          setIsSaved(true);
        });
      } else {
        sendUnsave({ postid: name, token }).then(() => {
          setIsSaved(false);
        });
      }
    }
  };

  return (
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
              backgroundImage: `url('/avatars/avatar_${getIntFromString(
                author,
                18
              )}.jpg')`,
              width: "48px",
              height: "48px",
              backgroundSize: "cover"
            }}
          ></div>
          <div className="pl-3">
            <Link href={`/user/${author}`}>
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
        {url && isVideo(url) ? (
          <div className="w-full shimmer-bg h-video">
            <iframe className="h-video-frame" src={getEmbedLink(url)}></iframe>
          </div>
        ) : url && isImage(url) ? (
          <img
            className="w-full shimmer-bg"
            src={replaceGifv(url)}
            width="100%"
          />
        ) : thumbnail && isImage(thumbnail) ? (
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
          !isImage(url) &&
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
            {upvoted ? (
              <img
                className="cursor-pointer w-8"
                src="/clap1.svg"
                onClick={() => castVote(0)}
              />
            ) : (
              <img
                className="cursor-pointer w-8"
                src="/clap.svg"
                onClick={() => castVote(1)}
              />
            )}
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
          {isSaved ? (
            <img className="cursor-pointer" src="/save1.svg" onClick={() => savePost(0)}/>
          ) : (
            <img className="cursor-pointer" src="/save.svg" onClick={() => savePost(1)}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
