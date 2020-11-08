import React from "react";

const SubredditInfo = (subredditInfo: any) => (
  <div>
    <div className="flex flex-row items-center">
      <div
        className="rounded"
        style={{
          backgroundImage:
            "url(" +
            (subredditInfo.icon_img && subredditInfo.icon_img.includes("://")
              ? subredditInfo.icon_img
              : "/default.jpg") +
            ")",
          width: "36px",
          height: "36px",
          backgroundSize: "cover"
        }}
      ></div>
      <span className="ml-2 sub-opacity-54 text-18 pl-2">
        {subredditInfo.display_name}
      </span>
    </div>
    <div className="leading-5 py-4 text-16">
      <div className="mb-4 sub-opacity-68">
        {subredditInfo.public_description}
      </div>
      <a
        className="sub-link-grey link-black-hover"
        href={`https://reddit.com/r/${subredditInfo.display_name}`}
      >
        More information
      </a>
    </div>
    <div className="pb-4 sub-opacity-68">
      <div className="uppercase sub-opacity-54 font-medium tracking-wide">Followers</div>
      {subredditInfo.subscribers}
    </div>
  </div>
);

export default SubredditInfo;
