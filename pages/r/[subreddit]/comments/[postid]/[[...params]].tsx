import { GetServerSideProps } from "next";
import {
  getPostInfo,
} from "../../../../api/posts";
import React from "react";
import PostLayout from "../../../../../components/PostLayout";
import PostHeader from "../../../../../components/post-page/PostHeader";
import PostContent from "../../../../../components/post-page/PostContent"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const post = await getPostInfo(query);
  return {
    props: {
      ...post,
      params: query
    }
  };
};

const PostPage = ({ post, params }: any) => {
//   const [{ commentList, after }, setCommentList] = useState(comments);
  // const [selectedParams, setSelectedParams] = useState({
  //   ...zipObject(POPULAR_PARAM_KEY, POPULAR_PARAM_DEFAULT),
  //   ...params
  // });

  return (
    <PostLayout title={`${post.title} | ${params.subreddit}`}>
        <PostHeader {...params}/>
      <section>
          <PostContent {...post}/>
      </section>
      <section className="w-full mx-auto max-w-600 pb-10">
        <div className="sub-bottom-border mb-4 pt-4"></div>
      </section>
    </PostLayout>
  );
};

export default PostPage;
