import React from "react";
import { getIntFromString, limitText } from "../../functions/common";
import { PLACEHOLDER_IMAGES, TITLE_MAX } from "../../functions/constants";
import { Post } from "../../interfaces";
import { PostMetadata } from "../common";

const LargeCard = (post: Post) =>
  post.hasOwnProperty("title") ? (
    <div className="overflow-hidden sm-border-b sm:pb-8 sm:mb-6">
      <a href={post.permalink}>
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
            minHeight: "240px",
            backgroundSize: "cover"
          }}
        ></div>
      </a>
      <div className="sub-text font-medium main-black mt-3 flex flex-row items-center">
        <div
          className="rounded-full"
          style={{
            backgroundImage: `url('/avatars/avatar (${getIntFromString(
              post.author,
              18
            )}).jpg')`,
            width: "20px",
            height: "20px",
            backgroundSize: "cover"
          }}
        ></div>
        <span className="ml-2 font-semibold">{post.author}</span>
      </div>
      <a href={post.permalink}>
        <h2 className="text-2xl mt-2 leading-6">{post.title}</h2>
        <h4 className="text-lg my-2 tracking-tight sub-opacity-54 w-10/12">
          {limitText(post.selftext, TITLE_MAX)}
        </h4>
      </a>
      <PostMetadata
        className="sub-text mt-2"
        created_utc={post.created_utc}
        subreddit_name_prefixed={post.subreddit_name_prefixed}
      />
    </div>
  ) : (
    <div className="max-w-sm overflow-hidden shimmer">
      <div
        className="w-full shimmer-bg"
        style={{
          minHeight: "240px"
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

export default LargeCard;
