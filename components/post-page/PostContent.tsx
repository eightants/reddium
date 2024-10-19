import Link from "next/link";
import React, { useState } from "react";
import Image from 'next/image';
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
import { sendSave, sendUnsave, upvote } from "../../functions/service";
import PostBody from './PostBody';

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
    <div className="w-full mx-auto max-w-[80%] pb-2 mt-6 sm:mx-6 sm:w-auto">
      <h1 className="heading-font text-5xl font-normal leading-tight sm:text-3xl sm:leading-9">
        {title}
      </h1>
      <h3 className="sub-link-grey text-xl sm:text-lg sm:mt-2 sm:leading-5">
        {limitText(selftext, TITLE_MAX)}
      </h3>
      <div className="w-full mt-4 flex flex-row justify-between items-center sm:block">
        <div className="items-center sub-opacity-54 hidden sm:flex my-4">
          <Link
            href={url}
            className="w-8/12 truncate hover:underline font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </Link>
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
            <Link 
              href={`/user/${author}`}
              className="main-black text-md hover:underline cursor-pointer sm:text-sm"
            >
              {author}
            </Link>
            <div className="tracking-5 text-sm sub-opacity-68">
              <span>{getTime(created_utc)}</span>
              <span className="px-1">·</span>
              <Link 
                href={`/${subreddit_name_prefixed}`}
                className="hover:underline"
              >
                {subreddit_name_prefixed}
              </Link>
            </div>
          </div>
        </div>
        <div className="items-center flex sub-opacity-54 sm:hidden">
          <Link
            href={url}
            className="w-48 truncate hover:underline font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </Link>
        </div>
      </div>
      <figure className="mt-16">
        {url && isVideo(url) ? (
          <div className="w-full shimmer-bg h-video">
            <iframe className="h-video-frame" src={getEmbedLink(url)}></iframe>
          </div>
        ) : url && isImage(url) ? (
          <Image
            className="w-full shimmer-bg"
            src={replaceGifv(url)}
            alt={title}
            width={600}
            height={400}
            layout="responsive"
          />
        ) : thumbnail && isImage(thumbnail) ? (
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
              <Link href="https://unsplash.com" className="underline">
                Unsplash
              </Link>
            </div>
          ) : (
            "Original Image"
          )}
        </figcaption>
      </figure>
      <PostBody 
        content={selftext}
        className="mt-12 heading-font text-xl whitespace-pre-line main-black post-content sm:text-lg"
      />
      <div className="w-full mt-4 pt-4 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center sub-opacity-54 tracking-tight">
            {upvoted ? (
              <Image
                className="cursor-pointer w-8"
                src="/clap1.svg"
                alt="Upvoted"
                width={32}
                height={32}
                onClick={() => castVote(0)}
              />
            ) : (
              <Image
                className="cursor-pointer w-8"
                src="/clap.svg"
                alt="Not upvoted"
                width={32}
                height={32}
                onClick={() => castVote(1)}
              />
            )}
            <div>
              <p className="ml-2">{`${ups} claps`}</p>
            </div>
          </div>
          <div className="ml-4 flex flex-row items-center sub-opacity-54 tracking-tight">
            <Image className="cursor-pointer w-8 pt-1" src="/comment.svg" alt="Comment" width={32} height={32} />
            <div>
              <p className="ml-1">{num_comments}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center tracking-normal">
          {isSaved ? (
            <Image className="cursor-pointer" src="/save1.svg" alt="Saved" width={24} height={24} onClick={() => savePost(0)}/>
          ) : (
            <Image className="cursor-pointer" src="/save.svg" alt="Not saved" width={24} height={24} onClick={() => savePost(1)}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
