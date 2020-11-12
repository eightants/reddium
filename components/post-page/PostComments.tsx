import React from "react";
import { RootComment } from "./Comment";

const PostComments = ({ comments }: any) => {
  return (
    <div className="w-full mx-auto max-w-600 pb-2 mt-6 sm:mx-6 sm:w-auto">
      <div className="my-2 mx-4 px-6 py-3 input-shadow rounded">
        <h4 className="sub-opacity-54 text-sm">Add a comment...</h4>
      </div>
      {comments.map((comment: any, ind: number) => (
        <RootComment key={ind} comment={comment} depth_limit={2} />
      ))}
    </div>
  );
};

export default PostComments;
