import { GetServerSideProps } from "next";
import { getPostInfo } from "../../../../api/posts";
import React from "react";
import PostLayout from "../../../../../components/PostLayout";
import PostHeader from "../../../../../components/post-page/PostHeader";
import PostContent from "../../../../../components/post-page/PostContent";
import PostComments from "../../../../../components/post-page/PostComments";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);
  const commentId =
    query.hasOwnProperty("params") && query.params.length > 1
      ? query.params[1]
      : "";
  const post = await getPostInfo({ ...query, commentid: commentId });
  return {
    props: {
      ...post,
      params: query,
      commentId: commentId
    }
  };
};

const PostPage = ({ post, comments, params, commentId }: any) => {
  // const [selectedParams, setSelectedParams] = useState({
  //   ...zipObject(POPULAR_PARAM_KEY, POPULAR_PARAM_DEFAULT),
  //   ...params
  // });
  const returnToPost = () =>
    (window.location.href = `/r/${params.subreddit}/comments/${params.postid}`);
  return (
    <PostLayout
      title={`${post.title} | ${params.subreddit}`}
      permalink={post.permalink}
      thumbnail={post.thumbnail}
    >
      <PostHeader {...params} />
      <section>
        <PostContent {...post} />
      </section>
      <section className="w-full mx-auto max-w-600 pb-10">
        <div className="sub-bottom-border mb-4 pt-4"></div>
        <PostComments
          comments={comments}
          backToPost={commentId == "" ? "" : returnToPost}
        />
      </section>
    </PostLayout>
  );
};

export default PostPage;
