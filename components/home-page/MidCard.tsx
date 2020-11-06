import React from "react";
import { getTime } from "../../functions/common";
import { Post } from "../../interfaces";

const MidCard = ({
  title,
  created_utc,
  subreddit_name_prefixed,
  author, thumbnail
}: Post) => (
  <div className="mr-4 pb-8 flex overflow-hidden">
    <div className="w-full block pr-5 flex-grow">
      <div className="sub-text font-medium main-black mt-1">
        <span>{author}</span>
      </div>
      <div className="overflow-hidden max-h-16"><h2 className="mt-2">{title}</h2></div>
      <div className="sub-text mt-2">
        <span>{getTime(created_utc)}</span>
        <span className="px-2">·</span>
        <span>{subreddit_name_prefixed}</span>
      </div>
    </div>
    <div
      className="thumbnail-img"
      style={{
        backgroundImage:
          "url(" +
          ((thumbnail && thumbnail.includes("://")) ? thumbnail :
            "https://miro.medium.com/fit/c/376/282/0*agmaPXdDpkQVGdK1") +
          ")",
        width: "100px", 
        height: "100px",
        backgroundSize: "cover"
      }}
    ></div>
  </div>
);

export default MidCard;
