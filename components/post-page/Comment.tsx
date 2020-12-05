import Link from "next/link";
import React, { useState } from "react";

import MarkdownView from "react-showdown";

import {
  findRegularNested,
  getIntFromString,
  getTime,
  hasMoreComments
} from "../../functions/common";
import { upvote } from "../../pages/api/posts";

export const RootComment = ({ comment, depth_limit }: any) => {
  const [maxDepth, setMaxDepth] = useState(depth_limit);
  const addDepth = () => setMaxDepth(maxDepth + 2);
  return <Comment {...comment} max_depth={maxDepth} add_depth={addDepth} />;
};

export const Comment = ({
  author,
  name,
  likes,
  body,
  created_utc,
  replies,
  ups,
  max_depth,
  depth,
  permalink,
  token = "",
  checkedForMore
}: any) => {
  const [maxDepth, setMaxDepth] = useState(max_depth);
  const addDepth = () => setMaxDepth(depth + 2);
  const [upvoted, setUpvoted] = useState(likes || false);
  const castVote = (dir: number) => {
    if (token != "") {
      upvote({ postid: name, dir: dir, token }).then(() => {
        if (dir == 0) {
          setUpvoted(false);
        } else {
          setUpvoted(true);
        }
      });
    }
  };
  return replies || replies == "" ? (
    <div>
      <div className="pr-0 pl-3 pt-3">
        <div className="sub-bottom-border pb-6">
          <div className="w-full mt-4 flex flex-row justify-between items-center">
            <div className="items-center flex">
              <div
                className="rounded-full"
                style={{
                  backgroundImage: `url('/avatars/avatar_${getIntFromString(
                    author,
                    18
                  )}.jpg')`,
                  width: "32px",
                  height: "32px",
                  backgroundSize: "cover"
                }}
              ></div>
              <div className="pl-3">
                <Link href={`/user/${author}`}>
                  <span className="main-black text-md cursor-pointer sm:text-sm">
                    {author}
                  </span>
                </Link>
                <div className="tracking-5 text-sm sub-opacity-68 font-normal">
                  <span>{getTime(created_utc)}</span>
                </div>
              </div>
            </div>
            <button>
              <img className="" src="/more.svg" />
            </button>
          </div>
          <h4 className="py-2 font-normal main-black break-words">
            <MarkdownView markdown={body} options={{ emoji: true }} />
          </h4>
          <div className="w-full mt-4 flex flex-row justify-start items-center font-normal">
            <div className="flex flex-row items-center tracking-tight mr-4">
              {upvoted ? (
                <img
                  className="cursor-pointer w-6"
                  src="/clap1.svg"
                  onClick={() => castVote(0)}
                />
              ) : (
                <img
                  className="cursor-pointer w-6"
                  src="/clap.svg"
                  onClick={() => castVote(1)}
                />
              )}
              <div>
                <p className="ml-1">{ups}</p>
              </div>
            </div>
            <a href={permalink} className="post-link-clear">
              <div className="flex flex-row items-center tracking-tight text-black">
                <img className="cursor-pointer w-6 pt-1" src="/comment.svg" />
                <div>
                  <p className="ml-1 font-normal">
                    {replies != "" ? replies.data.children.length : ""}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        {replies != "" && depth < maxDepth ? (
          replies.data.children.map((c: any, i: number) => (
            <Comment
              key={i}
              {...c.data}
              token={token}
              checkedForMore={hasMoreComments(replies) || checkedForMore}
              max_depth={maxDepth}
              add_depth={addDepth}
            />
          ))
        ) : replies != "" && findRegularNested(replies).length > 0 ? (
          <button
            className="my-4 mx-auto p-2 cursor-pointer px-3 max-w-full load-more main-black font-semibold rounded flex flex-row justify-between items-center"
            onClick={addDepth}
          >
            <div className="flex-grow text-center">Expand</div>
            <img className="ml-3" src="/down_arrow.svg" />
          </button>
        ) : (
          ""
        )}
      </div>
      {replies != "" && !checkedForMore && hasMoreComments(replies) ? (
        <a href={permalink} className="post-link-clear">
          <button className="my-4 mx-auto p-2 cursor-pointer px-3 max-w-full load-more main-black font-semibold rounded flex flex-row justify-between items-center">
            <div className="flex-grow text-center">Expand thread</div>
            <img className="ml-3" src="/down_arrow.svg" />
          </button>{" "}
        </a>
      ) : (
        <h1></h1>
      )}
    </div>
  ) : (
    <div></div>
  );
};
