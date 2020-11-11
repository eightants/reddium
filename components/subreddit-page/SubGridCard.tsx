import React from "react";
import { getIntFromString, limitText } from "../../functions/common";
import { PLACEHOLDER_IMAGES, TITLE_MAX } from "../../functions/constants";
import { Post } from "../../interfaces";
import { PostMetadata } from "../common";

const SubGridCard = (post: Post) =>
  post.hasOwnProperty("title") ? (
    <div className="overflow-hidden w-4/12 flex-grow px-4 mb-4 md:w-full md:px-0">
      <div>
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
              height: "180px",
              backgroundSize: "cover"
            }}
          ></div>
          <h2 className="text-xl pt-6">{limitText(post.title, TITLE_MAX)}</h2>
          <h4 className="text-lg my-2 tracking-tight sub-opacity-54 w-10/12">
            {limitText(post.selftext, TITLE_MAX)}
          </h4>
        </a>
        <div className="sub-text font-medium main-black flex flex-row items-center mb-4 pt-3">
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
      </div>
    </div>
  ) : (
    <div className="flex-grow overflow-hidden shimmer">
      <div
        className="w-full shimmer-bg"
        style={{
          height: "180px"
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

export default SubGridCard;
