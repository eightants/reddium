import React from "react";
import { getIntFromString, getTime } from "../../functions/common";

const RankedCard = ({
  title,
  created_utc,
  subreddit_name_prefixed,
  author,
  rank
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
          <div className="rounded-full"
        style={{
          backgroundImage: `url('/avatars/avatar (${getIntFromString(author, 18)}).jpg')`,
          width: "20px",
          height: "20px",
          backgroundSize: "cover"
        }}
      ></div>
          <span className="ml-2 font-semibold">{author}</span>
          </div>
          <h2 className="mt-2">{title}</h2>
          <div className="sub-text mt-2">
            <span>{getTime(created_utc)}</span>
            <span className="px-2">·</span>
            <span>{subreddit_name_prefixed}</span>
          </div>
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
