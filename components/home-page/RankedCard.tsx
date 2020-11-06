import React from "react";
import { getTime } from "../../functions/common";

const RankedCard = ({
  title,
  created_utc,
  subreddit_name_prefixed,
  author, rank
}: any) => (
    <div className="mid-container">
  <div className="mr-4 pb-8 flex overflow-hidden">
      <div className="h-full -mt-2 mr-4">
        <span className="main-grey text-3xl font-bold">{("0" + rank.toString()).slice(("0" + rank.toString()).length - 2,)}</span>
      </div>
    <div className="w-full block pr-5 flex-grow">
      <div className="sub-text font-medium main-black mt-1">
        <span>{author}</span>
      </div>
      <h2 className="mt-2">{title}</h2>
      <div className="sub-text mt-2">
        <span>{getTime(created_utc)}</span>
        <span className="px-2">·</span>
        <span>{subreddit_name_prefixed}</span>
      </div>
    </div>
  </div></div>
);

export default RankedCard;
