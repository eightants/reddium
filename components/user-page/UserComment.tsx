import React from "react";
import MarkdownView from "react-showdown";

import { getTime } from "../../functions/common";

const UserComment = ({
  body,
  created_utc,
  replies,
  ups,
  link_title,
  permalink,
  subreddit_name_prefixed
}: any) => {
  return replies || replies == "" ? (
    <div className="w-full mx-auto max-w-600 pb-2 mb-6 sm:mx-6 sm:w-auto">
      <div className="flex items-center text-sm">
        <div className="flex items-center main-black">
          <span>Commented in </span>
          <a href={`/${subreddit_name_prefixed}`}>
            <span className="font-bold ml-1">{subreddit_name_prefixed}</span>
          </a>
        </div>
        <span className="px-1 sub-link-grey">·</span>
        <span className="sub-link-grey">{getTime(created_utc)}</span>
      </div>
      <a href={permalink}>
        <h1 className="text-2xl mt-3 font-bold tracking-tight leading-tight sm:text-xl sm:leading-6">
          {link_title}
        </h1>
      </a>
      <div className="pt-3">
        <div className="sub-bottom-border pb-6">
          <h4 className="py-2 font-normal main-black">
            <MarkdownView markdown={body} options={{ emoji: true }} />
          </h4>
          <div className="w-full mt-4 mb-4 flex flex-row justify-start items-center">
            <div className="flex flex-row items-center tracking-tight mr-4">
              <img className="cursor-pointer w-6" src="/clap.svg" />
              <div>
                <p className="ml-1">{ups}</p>
              </div>
            </div>
            <a href={permalink} className="post-link-clear">
              <div className="flex flex-row items-center tracking-tight">
                <img className="cursor-pointer w-6 pt-1" src="/comment.svg" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default UserComment;
