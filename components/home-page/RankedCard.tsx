import React from "react";
import { getIntFromString } from "../../functions/common";
import { PostMetadata } from "../common";

const RankedCard = ({
  title,
  created_utc,
  subreddit_name_prefixed,
  author,
  rank,
  permalink
}: any) =>
  title ? (
    <div className="mid-container">
      <div className="mr-4 pb-8 flex overflow-hidden">
        <div className="h-full -mt-2 mr-4">
          <span className="main-grey text-3xl font-bold">
            {("0" + rank.toString()).slice(("0" + rank.toString()).length - 2)}
          </span>
        </div>
        <div className="w-full block pr-5 flex-grow">
          <div className="sub-text font-medium main-black mt-1 flex flex-row items-center">
            <div
              className="rounded-full"
              style={{
                backgroundImage: `url('/avatars/avatar_${getIntFromString(
                  author,
                  18
                )}.jpg')`,
                width: "20px",
                height: "20px",
                backgroundSize: "cover"
              }}
            ></div>
            <a href={`/user/${author}`}>
              <span className="ml-2 font-semibold">{author}</span>
            </a>
          </div>
          <a href={permalink}>
            <h2 className="mt-2">{title}</h2>
          </a>
          <PostMetadata
            className="sub-text mt-2"
            created_utc={created_utc}
            subreddit_name_prefixed={subreddit_name_prefixed}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="mid-container shimmer">
      <div className="mr-4 pb-8 flex overflow-hidden">
        <div className="h-full -mt-2 mr-4">
          <span className="main-grey text-3xl font-bold">00</span>
        </div>
        <div className="w-full block pr-5 flex-grow">
          <div className="sub-text font-medium main-black mt-1">
            <div className="h-2 w-16 shimmer-bg"></div>
          </div>
          <div className="h-4 w-full mt-2 shimmer-bg"></div>
          <div className="h-4 w-16 mt-2 shimmer-bg"></div>
        </div>
      </div>
    </div>
  );

export default RankedCard;
