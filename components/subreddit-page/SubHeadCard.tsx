import React from "react";
import { getIntFromString } from "../../functions/common";
import { PLACEHOLDER_IMAGES } from "../../functions/constants";
import { Post } from "../../interfaces";
import { PostMetadata } from "../common";

const SubHeadCard = (post: Post) =>
  post.hasOwnProperty("title") ? (
    <div className="overflow-hidden">
      <div className="max-w-600">
        <div className="sub-text font-medium main-black flex flex-row items-center mb-4 pt-1">
          <div
            className="rounded-full"
            style={{
              backgroundImage: `url('/avatars/avatar (${getIntFromString(
                post.author,
                18
              )}).jpg')`,
              width: "36px",
              height: "36px",
              backgroundSize: "cover"
            }}
          ></div>
          <div className="pl-2 font-semibold">
            <span className="main-green">{post.author}</span>
            <PostMetadata
              className="tracking-5 sub-opacity-68"
              created_utc={post.created_utc}
              subreddit_name_prefixed={post.subreddit_name_prefixed}
            />
          </div>
        </div>
        <div
          className="w-full shimmer-bg"
          style={{
            backgroundImage:
              "url(" +
              (post.thumbnail && post.thumbnail.includes("://")
                ? post.thumbnail
                : `/placeholders/${
                    PLACEHOLDER_IMAGES[
                      getIntFromString(post.title, PLACEHOLDER_IMAGES.length)
                    ] || "default.jpg"
                  }`) +
              ")",
            height: "180px",
            width: "600px",
            backgroundSize: "cover"
          }}
        ></div>
        <h2 className="text-2xl pt-1 mt-8">{post.title}</h2>
        <h4 className="text-xl my-2 tracking-tight sub-opacity-54 w-10/12 truncate">
          {post.selftext}
        </h4>
        <div className="align-baseline p-0 pt-2">
          <a className="sub-opacity-54 cursor-pointer font-normal text-sm">
            Read more...
          </a>
        </div>
      </div>
      <div className="w-full flex justify-between flex-row items-center pt-4">
        <div className="flex flex-row items-center sub-opacity-54 tracking-tight">
          <img className="cursor-pointer" src="/clap.svg" />
          <div>
            <p className="ml-2 text-sm">{`${post.ups}`}</p>
          </div>
        </div>
        <div className="flex flex-row items-center tracking-normal">
          <div>
            <p className="mr-2 text-sm sub-opacity-54 cursor-pointer">{`${post.num_comments} responses`}</p>
          </div>
          <img className="cursor-pointer" src="/save.svg" />
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-600 overflow-hidden shimmer">
      <div
        className="w-full shimmer-bg"
        style={{
          height: "180px",
          width: "600px"
        }}
      ></div>
      <div className="w-full">
        <div className="sub-text font-medium main-black mt-3">
          <div className="h-2 w-20 shimmer-bg"></div>
        </div>
        <div className="h-4 w-full mt-2 shimmer-bg"></div>
        <div className="h-4 w-16 mt-2 shimmer-bg"></div>
        <div className="sub-text mt-2 shimmer-bg w-10 h-2"></div>
      </div>
    </div>
  );

export default SubHeadCard;
