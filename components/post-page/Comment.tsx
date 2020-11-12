import Link from "next/link";
import React, { useState } from "react";
import {
  findThreadDepth,
  getIntFromString,
  getTime
} from "../../functions/common";

export const RootComment = ({ comment, depth_limit }: any) => {
  const [maxDepth, setMaxDepth] = useState(depth_limit);
  const addDepth = () => setMaxDepth(maxDepth + 2);
  return <Comment {...comment} max_depth={maxDepth} add_depth={addDepth} />;
};

export const Comment = ({
  author,
  body,
  created_utc,
  replies,
  ups,
  max_depth,
  add_depth,
  depth
}: any) => {
  const [maxDepth, setMaxDepth] = useState(max_depth);
  const addDepth = () => setMaxDepth(depth + 2);
  return replies ? (
    <div>
      <div
        className="px-2 pt-3"
        style={{ paddingLeft: `${depth * 2 + 0.5}rem` }}
      >
        <div className="sub-bottom-border pb-6">
          <div className="w-full mt-4 flex flex-row justify-between items-center">
            <div className="items-center flex">
              <div
                className="rounded-full"
                style={{
                  backgroundImage: `url('/avatars/avatar (${getIntFromString(
                    author,
                    18
                  )}).jpg')`,
                  width: "32px",
                  height: "32px",
                  backgroundSize: "cover"
                }}
              ></div>
              <div className="pl-3">
                <Link href="/">
                  <span className="main-black text-md cursor-pointer sm:text-sm">
                    {author}
                  </span>
                </Link>
                <div className="tracking-5 text-sm sub-opacity-68">
                  <span>{getTime(created_utc)}</span>
                </div>
              </div>
            </div>
            <button>
              <img className="" src="/more.svg" />
            </button>
          </div>
          <h4 className="py-2 main-black">{body}</h4>
          <div className="w-full mt-4 flex flex-row justify-start items-center">
            <div className="flex flex-row items-center tracking-tight mr-4">
              <img className="cursor-pointer w-6" src="/clap.svg" />
              <div>
                <p className="ml-1">{ups}</p>
              </div>
            </div>
            <div className="flex flex-row items-center tracking-tight">
              <img className="cursor-pointer w-6 pt-1" src="/comment.svg" />
              <div>
                <p className="ml-1">
                  {replies != "" ? replies.data.children.length : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {replies != "" && depth < max_depth ? (
        replies.data.children.map((c: any, i: number) => (
          <Comment
            key={i}
            {...c.data}
            max_depth={maxDepth}
            add_depth={addDepth}
          />
        ))
      ) : replies != "" && findThreadDepth({ replies: replies }) > 1 ? (
        <button
          className="my-4 mx-auto p-2 cursor-pointer px-3 max-w-full load-more main-black font-semibold rounded flex flex-row justify-between items-center"
          onClick={add_depth}
        >
          <div className="flex-grow text-center">Expand thread</div>
          <img className="ml-3" src="/down_arrow.svg" />
        </button>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div></div>
  );
};
