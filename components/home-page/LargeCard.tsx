import React from "react";
import { getTime } from "../../functions/common";
import { Post } from "../../interfaces";

const LargeCard = (post: Post) => (
  <div className="max-w-sm overflow-hidden">
    <div
      className="w-full"
      style={{
        backgroundImage:
          "url(" +
          ((post.thumbnail && post.thumbnail.includes("://")) ? post.thumbnail :
            "https://miro.medium.com/fit/c/376/282/0*agmaPXdDpkQVGdK1") +
          ")",
        minHeight: "240px",
        backgroundSize: "cover"
      }}
    ></div>
    <div className="sub-text font-medium main-black mt-3">
      <span>{post.author}</span>
    </div>
    <h2 className="text-xl mt-2">{post.title}</h2>
    <div className="sub-text mt-2">
      <span>{getTime(post.created_utc)}</span>
      <span className="px-2">·</span>
      <span>{post.subreddit_name_prefixed}</span>
    </div>
  </div>
);

export default LargeCard;
