import Link from "next/link";
import React, { useState } from "react";
import MarkdownView from "react-showdown";
import Image from 'next/image';
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
import { sendSave, sendUnsave, upvote } from "../../functions/service";

const SearchPost = ({
  author,
  title,
  name,
  selftext,
  subreddit_name_prefixed,
  created_utc,
  permalink,
  url,
  ups,
  thumbnail,
  likes,
  saved,
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
                <span className="main-green font-semibold cursor-pointer">
                  {author}
                </span>
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
        (url.includes(".jpg") ||
          url.includes(".png") ||
          url.includes(".gif")) ? (
          <Image
            src={replaceGifv(url)}
            alt={title}
            width={600}
            height={400}
            layout="responsive"
            className="w-full shimmer-bg max-h-200"
          />
        ) : thumbnail && thumbnail.includes("://") ? (
          <Image
            src={thumbnail}
            alt={title}
            width={600}
            height={400}
            layout="responsive"
            className="w-full shimmer-bg max-h-200"
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
            {upvoted ? (
              <Image
                src="/clap1.svg"
                alt="Upvoted"
                width={24}
                height={24}
                className="cursor-pointer w-6"
                onClick={() => castVote(0)}
              />
            ) : (
              <Image
                src="/clap.svg"
                alt="Not upvoted"
                width={24}
                height={24}
                className="cursor-pointer w-6"
                onClick={() => castVote(1)}
              />
            )}
            <div>
              <p className="ml-2 sub-link-grey text-sm">{ups}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center tracking-normal">
          <div>
            <p className="ml-1 text-sm sub-link-grey mr-2">{`${num_comments} responses`}</p>
          </div>
          {isSaved ? (
            <Image
              src="/save1.svg"
              alt="Saved"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => savePost(0)}
            />
          ) : (
            <Image
              src="/save.svg"
              alt="Not saved"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => savePost(1)}
            />
          )}
        </div>
      </div>
      <div className="sub-bottom-border mb-4 pt-6"></div>
    </div>
  );
};

export default SearchPost;
