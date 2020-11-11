import React from "react";
import { getIntFromString, limitText } from "../../functions/common";
import { PLACEHOLDER_IMAGES, TITLE_MAX } from "../../functions/constants";
import { Post } from "../../interfaces";
import { PostMetadata } from "../common";

const MidCard = ({
  title,
  created_utc,
  subreddit_name_prefixed,
  author,
  thumbnail,
  permalink
}: Post) =>
  title ? (
    <div className="mr-4 pb-8 flex overflow-hidden sm:mr-0">
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
        <div className="overflow-hidden max-h-16">
          <a href={permalink}>
            <h2 className="mt-2">{limitText(title, TITLE_MAX)}</h2>
          </a>
        </div>
        <PostMetadata
          className="sub-text mt-2"
          created_utc={created_utc}
          subreddit_name_prefixed={subreddit_name_prefixed}
        />
      </div>
      <a href={permalink}>
        <div
          className="thumbnail-img"
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
            width: "100px",
            height: "100px",
            backgroundSize: "cover"
          }}
        ></div>
      </a>
    </div>
  ) : (
    <div className="mr-4 pb-8 flex overflow-hidden shimmer">
      <div className="w-full block pr-5 flex-grow">
        <div className="sub-text font-medium main-black mt-1">
          <div className="h-2 w-16 shimmer-bg"></div>
        </div>
        <div className="overflow-hidden max-h-16">
          <div className="h-4 w-full mt-2 shimmer-bg"></div>
          <div className="h-4 w-16 mt-2 shimmer-bg"></div>
        </div>
      </div>
      <div
        className="thumbnail-img shimmer-bg"
        style={{
          width: "100px",
          height: "100px"
        }}
      ></div>
    </div>
  );

export default MidCard;
