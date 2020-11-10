import React from "react";
import { getIntFromString, getTime, limitText } from "../../functions/common";
import {
  DESC_MAX,
  PLACEHOLDER_IMAGES,
  TITLE_MAX
} from "../../functions/constants";
import { Post } from "../../interfaces";

const SubWideCard = ({
  title,
  created_utc,
  subreddit_name_prefixed,
  author,
  thumbnail,
  selftext
}: Post) =>
  title ? (
    <div className="py-8 overflow-hidden sub-bottom-border">
      <div className="flex">
        <div className="w-full block pr-5 flex-grow">
          <h2 className="mt-2 overflow-hidden max-h-14 leading-8 text-2xl font-normal tracking-normal">
            {limitText(title, TITLE_MAX)}
          </h2>
          <h4 className="text-lg tracking-tight sub-opacity-54">
            {limitText(selftext, DESC_MAX)}
          </h4>
        </div>
        <div
          className="sub-thumbnail-img"
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
            width: "140px",
            height: "120px",
            backgroundSize: "cover"
          }}
        ></div>
      </div>
      <div className="sub-text font-medium main-black flex flex-row items-center mb-4 pt-3">
        <div
          className="rounded-full"
          style={{
            backgroundImage: `url('/avatars/avatar (${getIntFromString(
              author,
              18
            )}).jpg')`,
            width: "36px",
            height: "36px",
            backgroundSize: "cover"
          }}
        ></div>
        <div className="pl-2 font-semibold">
          <span className="main-green">{author}</span>
          <div className="tracking-5 sub-opacity-68">
            <span>{getTime(created_utc)}</span>
            <span className="px-2">·</span>
            <span>{subreddit_name_prefixed}</span>
          </div>
        </div>
      </div>
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

export default SubWideCard;
