import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import PostLayout from "../../../../../components/PostLayout";
import PostHeader from "../../../../../components/post-page/PostHeader";
import PostContent from "../../../../../components/post-page/PostContent";
import PostComments from "../../../../../components/post-page/PostComments";
import { Dropdown } from "../../../../../components/common";
import {
  COMMENT_PARAM_DEFAULT,
  COMMENT_PARAM_KEY,
  COMMENT_PARAM_VALUES,
  SORT_PARAM
} from "../../../../../functions/constants";
import { zipObject } from "lodash";
import Cookies from "cookies";
import { getPostInfo } from "../../../../../functions/service";
import { H } from "highlight.run";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query
}) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("token") || "";
  const commentId =
    query.hasOwnProperty("params") && query.params.length > 1
      ? query.params[1]
      : "";
  const post = await getPostInfo({
    ...query,
    commentid: commentId,
    token: token
  });
  return {
    props: {
      ...post,
      params: {
        ...query,
        token: token
      },
      commentId: commentId
    }
  };
};

const PostPage = ({ post, comments, params, commentId }: any) => {
  // const [moreIndex, setMoreIndex] = useState(0);
  // const [commentList, setCommentList] = useState(comments);
  const [selectedParams, setSelectedParams] = useState({
    ...zipObject(COMMENT_PARAM_KEY, COMMENT_PARAM_DEFAULT),
    ...params
  });
  const filterPopular = () => {
    window.location.href = `/r/${params.subreddit}/comments/${params.postid}?sort=${selectedParams[SORT_PARAM]}`;
  };
  const returnToPost = () =>
    (window.location.href = `/r/${params.subreddit}/comments/${params.postid}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      H.track(
        "Post", 
        {subredditName: params.subreddit, nsfw: post.over_18.toString()}
      );
    }
  });
  // const fetchMoreComments = async () => {
  //   const moreObject = comments[comments.length - 1];
  //   const moreComments = await getMoreCommentsClient({
  //     link_id: moreObject.parent_id,
  //     children: moreObject.children.slice(
  //       moreIndex,
  //       Math.min(moreIndex + 30, moreObject.children.length)
  //     )
  //   });
  //   if (moreIndex + 30 >= moreObject.children.length) {
  //     setMoreIndex(-1);
  //   } else {
  //     setMoreIndex(moreIndex + 30);
  //   }
  //   // setCommentList([...commentList, ...moreComments]);
  // };
  return (
    <PostLayout
      title={`${post.title} | ${params.subreddit}`}
      permalink={post.permalink}
      thumbnail={post.thumbnail}
      token={params.token}
    >
      <PostHeader {...params} />
      <section>
        <PostContent {...post} token={selectedParams.token} />
      </section>
      <section className="w-full mx-auto max-w-600 pb-10">
        <div className="sub-bottom-border mb-4 pt-4"></div>
        <div className="flex justify-start mb-8">
          <div className="max-width-filter flex w-full px-4">
            <Dropdown
              key={SORT_PARAM}
              id={SORT_PARAM}
              paramKey={COMMENT_PARAM_KEY}
              paramVal={COMMENT_PARAM_VALUES}
              dataObj={selectedParams}
              updateParams={setSelectedParams}
            />
            <button
              className="ml-2 my-4 p-2 cursor-pointer w-48 max-w-full btn-black text-white rounded"
              onClick={filterPopular}
            >
              Filter
            </button>
          </div>
        </div>
        <PostComments
          comments={comments}
          backToPost={commentId == "" ? "" : returnToPost}
          token={selectedParams.token}
        />
      </section>
    </PostLayout>
  );
};

export default PostPage;
