import React from "react";
import { getIntFromString, getTime, limitText } from "../../functions/common";
import { PLACEHOLDER_IMAGES, TITLE_MAX } from "../../functions/constants";
import { Post } from "../../interfaces";

const WideCard = ({
  title,
  created_utc,
  subreddit_name_prefixed,
  author,
  thumbnail,
  selftext
}: Post) =>
  title ? (
    <div className="mr-4 pb-8 flex overflow-hidden">
      <div className="w-full block pr-5 flex-grow">
        <div className="sub-text font-medium main-black mt-1 flex flex-row items-center">
          <div
            className="rounded-full"
            style={{
              backgroundImage: `url('/avatars/avatar (${getIntFromString(
                author,
                18
              )}).jpg')`,
              width: "20px",
              height: "20px",
              backgroundSize: "cover"
            }}
          ></div>
          <span className="ml-2 font-semibold">{author}</span>
        </div>
        <h2 className="mt-2 overflow-hidden max-h-14 leading-8 text-2xl">
          {limitText(title, TITLE_MAX)}
        </h2>
        <h4 className="text-base mb-2 tracking-tight sub-opacity-54">
          {limitText(selftext, TITLE_MAX)}
        </h4>
        <div className="sub-text mt-2">
          <span>{getTime(created_utc)}</span>
          <span className="px-2">·</span>
          <span>{subreddit_name_prefixed}</span>
        </div>
      </div>
      <div
        className="wide-thumbnail-img"
        style={{
          backgroundImage:
            "url(" +
            (thumbnail && thumbnail.includes("://")
              ? thumbnail
              : `/placeholders/${
                  PLACEHOLDER_IMAGES[
                    getIntFromString(title, PLACEHOLDER_IMAGES.length)
                  ] || "default.jpg"
                }`) +
            ")",
          width: "180px",
          height: "112px",
          backgroundSize: "cover"
        }}
      ></div>
    </div>
  ) : (
    <div className="mr-4 pb-8 flex overflow-hidden shimmer">
      <div className="w-full block pr-5 flex-grow">
        <div className="sub-text font-medium main-black mt-1">
          <div className="h-2 w-16 shimmer-bg"></div>
        </div>
        <div className="h-4 w-full mt-2 shimmer-bg"></div>
        <div className="h-4 w-20 max-w-full mt-2 shimmer-bg"></div>
      </div>
      <div
        className="wide-thumbnail-img shimmer-bg"
        style={{
          width: "180px",
          height: "112px"
        }}
      ></div>
    </div>
  );

export default WideCard;
