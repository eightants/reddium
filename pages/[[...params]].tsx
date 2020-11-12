import Layout from "../components/Layout";
import { zipObject } from "lodash";

import MidCard from "../components/home-page/MidCard";
import { Dropdown, MidContainer } from "../components/common";
import { GetServerSideProps } from "next";
import { getPopularPosts } from "./api/posts";
import LargeCard from "../components/home-page/LargeCard";
import {
  POPULAR_PARAM_KEY,
  POPULAR_PARAM_DEFAULT,
  SORT_TYPE,
  TIME_FILTER
} from "../functions/constants";
import { useRef, useState } from "react";
import RankedCard from "../components/home-page/RankedCard";
import WideCard from "../components/home-page/WideCard";
import TrendingSubs from "../components/home-page/TrendingSubs";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);
  const posts = await getPopularPosts({
    ...query,
    sort_type: query.hasOwnProperty("params") ? query.params[0] : "hot"
  });
  const trendingSubs = await getPopularPosts({
    subreddit: "trendingsubreddits",
    sort_type: "new",
    limit: 1
  });
  return {
    props: {
      postData: { ...posts },
      trendingSubs,
      params: {
        ...query,
        sort_type: query.hasOwnProperty("params") ? query.params[0] : "hot"
      }
    }
  };
};

const IndexPage = ({ postData, trendingSubs, params }: any) => {
  const [{ posts, after }, setPostData] = useState(postData);
  const [selectedParams, setSelectedParams] = useState({
    ...zipObject(POPULAR_PARAM_KEY, POPULAR_PARAM_DEFAULT),
    ...params
  });
  const loader = useRef<HTMLDivElement>(null);

  const filterPopular = () => {
    setPostData({ posts: new Array(15).fill({}) });
    window.location.href = `/${selectedParams.sort_type}?t=${selectedParams.t}&limit=${selectedParams.limit}`;
  };

  const fetchMorePosts = async () => {
    const next = await getPopularPosts({
      ...selectedParams,
      after: after
    });
    setPostData({ ...next, posts: [...posts, ...next.posts] });
  };

  return (
    <Layout title="Reddium">
      <div className="lg:w-auto lg:mx-12 mx-auto w-full flex main-container max-width-main pb-10 sm:mx-6">
        <MidContainer>
          <LargeCard {...posts[0]} />
        </MidContainer>
        <MidContainer>
          {posts.slice(1, 5).map((p: any) => (
            <MidCard key={p.id} {...p} />
          ))}
        </MidContainer>
        <MidContainer>
          <div className="h-full container-divide pl-8 block lg:hidden">
            <div className="mb-12">
              <p className="heading-text text-sm leading-4 uppercase tracking-wide">
                Popular posts
              </p>

              <Dropdown
                key={SORT_TYPE}
                id={SORT_TYPE}
                dataObj={selectedParams}
                updateParams={setSelectedParams}
              />
              {selectedParams.sort_type == "top" ? (
                <Dropdown
                  key={TIME_FILTER}
                  id={TIME_FILTER}
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
            <TrendingSubs {...trendingSubs} />
          </div>
        </MidContainer>
      </div>
      <div className="w-full main-container max-width-main pb-4 pt-10 sub-top-border hidden lg:w-auto lg:mx-12 lg:flex sm:mx-6">
        <MidContainer>
          <div className="h-full">
            <div className="mb-12">
              <p className="heading-text text-sm leading-4 uppercase tracking-wide sm:text-xs">
                Popular posts
              </p>

              <Dropdown
                key={SORT_TYPE}
                id={SORT_TYPE}
                dataObj={selectedParams}
                updateParams={setSelectedParams}
              />
              {selectedParams.sort_type == "top" ? (
                <Dropdown
                  key={TIME_FILTER}
                  id={TIME_FILTER}
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
        </MidContainer>
        <MidContainer>
          <div className="h-full container-divide pl-8 sm:pl-0">
            <TrendingSubs {...trendingSubs} />
          </div>
        </MidContainer>
      </div>
      <div className="w-full flex main-container max-width-main pb-4 pt-10 sub-top-border lg:w-auto lg:mx-12 sm:mx-6">
        <div className="w-full flex mb-4 flex-row items-center">
          <img className="mr-3" src="trending.svg" />
          <div>
            <p className="heading-text text-sm leading-4 uppercase tracking-wide sm:text-xs">
              Trending on Reddit
            </p>
          </div>
        </div>
        <div className="w-full flex mb-4 flex-row items-start flex-wrap">
          {posts.slice(5, 11).map((p: any, ind: number) => (
            <RankedCard key={p.id} rank={ind + 6} {...p} />
          ))}
        </div>
      </div>
      <div className="w-full flex main-container max-width-main pb-4 pt-10 sub-top-border posts-grid lg:w-auto lg:mx-12 md:block sm:mx-6">
        <div className="w-full mb-4 grid-left">
          {posts.slice(11, posts.length).map((p: any) => (
            <WideCard key={p.id} {...p} />
          ))}
          <div className="w-full text-center" ref={loader}>
            {/* <WideCard {...({} as Post)} /> */}
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
          <div className="sticky top-8 p-8 about-bg flex flex-col">
            <div className="w-full flex mb-4 flex-row items-center">
              <img className="mr-3" src="bookmarks.svg" />
              <div>
                <p className="heading-text text-sm leading-4 uppercase tracking-wide sm:text-xs">
                  About Reddium
                </p>
              </div>
            </div>
            <div className="w-full pb-6">
              <p className="text-sm">
                Have you ever wanted to browse Reddit while studying at
                Starbucks? Or maybe while sitting on the subway to work? In
                those situations, would people around you judge the subreddits
                you browse and the posts you read?
                <br />
                <br />
                Now, think about someone browsing Medium in these situations.
                Just seeing the interface of Medium gives the impression of
                someone being a "knowledge seeker".
                <br />
                <br />
                Reddium is a Medium-themed Reddit client. The Reddium interface
                converts Reddit posts, discussions, and memes into well-crafted
                articles. I hope you enjoy this project! Feel free to suggest
                any features or report bugs on GitHub. 
              </p>
            </div>
            <a
              href="https://github.com/eightants/reddium/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-2 mx-2 p-2 pl-0 pb-3 cursor-pointer w-full max-w-full btn-black text-white rounded">
                ✨ Star on GitHub
              </button>
            </a>
            <a
              href="https://ko-fi.com/eightants"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-2 mx-2 p-2 pl-0 pb-3 cursor-pointer w-full max-w-full btn-outline-black text-white rounded">
                ☕ Buy me a coffee
              </button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
