import Subpage from "../../../components/Subpage";
import { zipObject } from "lodash";

import { Dropdown } from "../../../components/common";
import { GetServerSideProps } from "next";
import {
  getPopularPosts,
  getPopularPostsClient,
  getSubredditInfo,
} from "../../../functions/service";
import {
  POPULAR_PARAM_KEY,
  POPULAR_PARAM_DEFAULT,
  SORT_TYPE,
  TIME_FILTER,
  POPULAR_PARAM_VALUES,
} from "../../../functions/constants";
import React, { useEffect, useState } from "react";
import Header from "../../../components/subreddit-page/Header";
import SubWideCard from "../../../components/subreddit-page/SubWideCard";
import SubGridCard from "../../../components/subreddit-page/SubGridCard";
import SubredditInfo from "../../../components/subreddit-page/SubredditInfo";
import Cookies from "cookies";
import { H } from "highlight.run";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const posts = await getPopularPosts({
    ...query,
    sort_type: query.params ? query.params[0] : "hot",
  });
  const cookies = new Cookies(req, res);
  const token = cookies.get("token") || "";
  const subredditInfo = await getSubredditInfo({ ...query, token: token });
  return {
    props: {
      postData: { ...posts },
      subredditInfo,
      params: {
        ...query,
        token: token,
        sort_type: query.params ? query.params[0] : "hot",
      },
    },
  };
};

const SubredditPage = ({ postData, subredditInfo, params }: any) => {
  const [{ posts, after }, setPostData] = useState(postData);
  const [selectedParams, setSelectedParams] = useState({
    ...zipObject(POPULAR_PARAM_KEY, POPULAR_PARAM_DEFAULT),
    ...params,
  });

  const filterPopular = () => {
    setPostData({ posts: new Array(15).fill({}) });
    window.location.href = `/r/${selectedParams.subreddit}/${selectedParams.sort_type}?t=${selectedParams.t}&limit=${selectedParams.limit}`;
  };

  const fetchMorePosts = async () => {
    const next = await getPopularPostsClient({
      ...selectedParams,
      after: after,
    });
    setPostData({ posts: [...posts, ...next.posts], after: next.after });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(subredditInfo.over18);
      H.track("Subreddit", {
        subredditName: subredditInfo.display_name,
        nsfw: subredditInfo.over18.toString(),
      });
    }
  });

  return (
    <Subpage
      title={subredditInfo.display_name}
      subreddit={params.subreddit}
      token={params.token}
      backgroundColor="rgb(250,250,250)"
    >
      <Header {...params} {...subredditInfo} />
      <section className="w-full mx-auto max-width-sub pb-10 mt-6 lg:w-auto lg:mx-12 sm:mx-6">
        <header className="sub-bottom-border pb-2">
          <span className="text-lg sub-opacity-68">Featured</span>
        </header>
        <div className="my-6 flex flex-row flex-wrap sm-border-b sm:pb-4">
          {posts.slice(0, 3).map((p: any, ind: number) => (
            <SubGridCard key={ind} {...p} />
          ))}
        </div>
      </section>
      <section className="hidden mx-12 w-auto max-width-sub pb-10 mt-6 md:block sm:mx-6">
        <SubredditInfo {...subredditInfo} />
        <div className="h-full pt-8">
          <div className="mb-12">
            <p className="heading-text text-sm leading-4 uppercase tracking-wide">
              Popular posts
            </p>

            <Dropdown
              key={SORT_TYPE}
              id={SORT_TYPE}
              paramKey={POPULAR_PARAM_KEY}
              paramVal={POPULAR_PARAM_VALUES}
              dataObj={selectedParams}
              updateParams={setSelectedParams}
            />
            {selectedParams.sort_type == "top" ? (
              <Dropdown
                key={TIME_FILTER}
                id={TIME_FILTER}
                paramKey={POPULAR_PARAM_KEY}
                paramVal={POPULAR_PARAM_VALUES}
                dataObj={selectedParams}
                updateParams={setSelectedParams}
              />
            ) : (
              ""
            )}
            <button
              className="my-4 p-2 cursor-pointer w-48 max-w-full btn-black text-white rounded"
              onClick={filterPopular}
            >
              Filter
            </button>
          </div>
        </div>
      </section>
      <div className="w-full flex main-container max-width-sub pb-4 posts-grid md:block lg:w-auto lg:mx-12 sm:mx-6">
        <div className="w-full mb-4 grid-left">
          <header className="sub-bottom-border pb-2">
            <span className="text-lg sub-opacity-68">Trending</span>
          </header>
          {posts.slice(3, posts.length).map((p: any, ind: number) => (
            <SubWideCard key={ind} {...p} />
          ))}
          <div className="w-full text-center">
            <button
              className="my-4 mx-auto p-2 cursor-pointer w-48 max-w-full load-more main-black font-semibold rounded flex flex-row justify-between items-center"
              onClick={fetchMorePosts}
            >
              <div className="flex-grow text-center">Show More</div>
              <img className="ml-3" src="/down_arrow.svg" />
            </button>
          </div>
        </div>
        <div className="grid-right md:hidden">
          <div className="sticky top-8 p-8">
            <SubredditInfo {...subredditInfo} />
            <div className="h-full pt-8">
              <div className="mb-12">
                <p className="heading-text text-sm leading-4 uppercase tracking-wide">
                  Popular posts
                </p>

                <Dropdown
                  key={SORT_TYPE}
                  id={SORT_TYPE}
                  paramKey={POPULAR_PARAM_KEY}
                  paramVal={POPULAR_PARAM_VALUES}
                  dataObj={selectedParams}
                  updateParams={setSelectedParams}
                />
                {selectedParams.sort_type == "top" ? (
                  <Dropdown
                    key={TIME_FILTER}
                    id={TIME_FILTER}
                    paramKey={POPULAR_PARAM_KEY}
                    paramVal={POPULAR_PARAM_VALUES}
                    dataObj={selectedParams}
                    updateParams={setSelectedParams}
                  />
                ) : (
                  ""
                )}
                <button
                  className="my-4 p-2 cursor-pointer w-48 max-w-full btn-black text-white rounded"
                  onClick={filterPopular}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Subpage>
  );
};

export default SubredditPage;
