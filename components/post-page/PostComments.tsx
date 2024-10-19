import React from "react";
import Image from 'next/image';
import { Comment } from "./Comment";

const PostComments = ({ comments, backToPost, token }: any) => {
  return (
    <div className="w-full mx-auto max-w-[80%] pb-2 mt-6 sm:mx-6 sm:w-auto post-content">
      <div className="my-2 mx-4 px-6 py-3 input-shadow rounded">
        <h4 className="sub-opacity-54 text-sm">Add a comment...</h4>
      </div>
      {backToPost != "" ? (
        <button
          className="mt-8 p-2 cursor-pointer pr-4 pl-2 max-w-full load-more main-black font-semibold rounded flex flex-row justify-between items-center"
          onClick={backToPost}
        >
          <Image 
            className="mr-3 transform rotate-90" 
            src="/down_arrow.svg" 
            alt="Back to post"
            width={24}
            height={24}
          />
          <div className="flex-grow text-center">Return to post</div>
        </button>
      ) : (
        <div></div>
      )}
      {comments.map((comment: any, ind: number) => (
        <Comment
          key={ind}
          {...comment}
          max_depth={2}
          token={token}
          checkedForMore={false}
        />
      ))}
    </div>
  );
};

export default PostComments;
