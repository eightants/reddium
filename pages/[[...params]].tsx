import Layout from "../components/Layout";
import { zipObject } from "lodash";
import Cookies from "cookies";
import Image from 'next/image';

import MidCard from "../components/home-page/MidCard";
import { Dropdown, MidContainer } from "../components/common";
import { GetServerSideProps } from "next";
import {
  getPopularPosts,
  getPopularPostsClient,
  getProfile,
} from "../functions/service";
import LargeCard from "../components/home-page/LargeCard";
import {
  POPULAR_PARAM_KEY,
  POPULAR_PARAM_DEFAULT,
  SORT_TYPE,
  TIME_FILTER,
  POPULAR_PARAM_VALUES,
  LOADING_POST_LIST,
} from "../functions/constants";
import { useEffect, useRef, useState } from "react";
import RankedCard from "../components/home-page/RankedCard";
import WideCard from "../components/home-page/WideCard";
import TrendingSubs from "../components/home-page/TrendingSubs";
import { H } from "highlight.run";
import { useConfig } from '../functions/useConfig';  // Adjust the import path as needed

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const trendingSubs = await getPopularPosts({
    subreddit: "trendingsubreddits",
    sort_type: "new",
    limit: 1,
  });
  const cookies = new Cookies(req, res);
  const token = cookies.get("token") || "";
  const profile = token === "" ? {} : await getProfile({ token });
  return {
    props: {
      trendingSubs,
      profile,
      params: {
        ...query,
        token: token,
        sort_type: query.params ? query?.params[0] : "hot",
      },
    },
  };
};

const IndexPage = ({ trendingSubs, profile, params }: any) => {
  const [{ posts, after }, setPostData] = useState(LOADING_POST_LIST);
  const [selectedParams, setSelectedParams] = useState({
    ...zipObject(POPULAR_PARAM_KEY, POPULAR_PARAM_DEFAULT),
    ...params,
  });
  const loader = useRef<HTMLDivElement>(null);

  if (typeof window !== "undefined" && profile?.name) {
    H.identify(profile.name, { id: profile.name });
  }

  const { config } = useConfig();

  // Use optional chaining to safely access config properties
  const showAboutSection = config?.REDDIUM_SHOW_ABOUT;
  const showKofiLink = config?.REDDIUM_DISABLE_KOFI_LINK;
  const showGithubLink = config?.REDDIUM_DISABLE_GITHUB_LINK;

  useEffect(() => {
    getPopularPostsClient({ ...selectedParams, home: true }).then((res) => {
      setPostData(res);
    });
  }, [selectedParams]); // Add selectedParams to the dependency array

  const filterPopular = () => {
    setPostData(LOADING_POST_LIST);
    window.location.href = `/${selectedParams.sort_type}?t=${selectedParams.t}&limit=${selectedParams.limit}`;
  };

  const fetchMorePosts = async () => {
    const next = await getPopularPosts({
      ...selectedParams,
      after: after,
    });
    setPostData({ posts: [...posts, ...next.posts], after: next.after });
  };

  return (
    <Layout title="Reddium – Medium-themed Reddit client" token={params.token}>
      <div className="lg:w-auto lg:mx-12 mx-auto w-full flex main-container max-width-main pb-10 sm:mx-6">
        <MidContainer>
          <LargeCard {...posts[0]} />
        </MidContainer>
        <MidContainer>
          {posts.slice(1, 5).map((p: any, ind: number) => (
            <MidCard key={ind} {...p} />
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
        </MidContainer>
        <MidContainer>
          <div className="h-full container-divide pl-8 sm:pl-0">
            <TrendingSubs {...trendingSubs} />
          </div>
        </MidContainer>
      </div>
      <div className="w-full flex main-container max-width-main pb-4 pt-10 sub-top-border lg:w-auto lg:mx-12 sm:mx-6">
        <div className="w-full flex mb-4 flex-row items-center">
          <Image 
            src="/trending.svg" 
            alt="Trending icon" 
            width={24} 
            height={24} 
            className="mr-3"
          />
          <div>
            <p className="heading-text text-sm leading-4 uppercase tracking-wide sm:text-xs">
              Trending on Reddit
            </p>
          </div>
        </div>
        <div className="w-full flex mb-4 flex-row items-start flex-wrap">
          {posts.slice(5, 11).map((p: any, ind: number) => (
            <RankedCard key={ind} rank={ind + 6} {...p} />
          ))}
        </div>
      </div>
      <div className="w-full flex main-container max-width-main pb-4 pt-10 sub-top-border posts-grid lg:w-auto lg:mx-12 md:block sm:mx-6">
        <div className="w-full mb-4 grid-left">
          {posts.slice(11, posts.length).map((p: any, ind: number) => (
            <WideCard key={ind} {...p} />
          ))}
          <div className="w-full text-center" ref={loader}>
            <button
              className="my-4 mx-auto p-2 cursor-pointer w-48 max-w-full load-more main-black font-semibold rounded flex flex-row justify-between items-center"
              onClick={fetchMorePosts}
            >
              <div className="flex-grow text-center">Show More</div>
              <Image 
                src="/down_arrow.svg" 
                alt="Down arrow" 
                width={16} 
                height={16} 
                className="ml-3"
              />
            </button>
          </div>
        </div>
        {showAboutSection && (
          <div className="grid-right md:hidden">
            <div className="sticky top-8 p-8 about-bg flex flex-col">
              <div className="w-full flex mb-4 flex-row items-center">
                <Image 
                  src="/bookmarks.svg" 
                  alt="Bookmarks icon" 
                  width={24} 
                  height={24} 
                  className="mr-3"
                />
                <div>
                  <p className="heading-text text-sm leading-4 uppercase tracking-wide sm:text-xs">
                    About Reddium
                  </p>
                </div>
              </div>
              <div className="w-full pb-6">
                <p className="text-sm">
                  Ever wanted to browse Reddit while studying at Starbucks? Or
                  while sitting on the subway to work? Worried that people around
                  you would judge the subreddits you browse and the posts you
                  read?
                  <br />
                  <br />
                  {`Reddium is a Medium-themed Reddit client. The Reddium interface
                  converts Reddit posts, discussions, and memes into well-crafted
                  articles. Medium's layout feels a little more readable than
                  Reddit's, removing all distractions and clutter. It also
                  bypasses Reddit's frustrating mobile browser.`}
                  <br />
                  <br />I hope you enjoy this project! Feel free to suggest any
                  features or report bugs on GitHub.
                </p>
              </div>
              <div className="w-full pb-6 hidden">
                <Image 
                  src="/signature.png" 
                  alt="Signature" 
                  width={100} 
                  height={50} 
                  className="w-4/12 float-right"
                />
              </div>
              {showGithubLink && (
                <a
                  href="https://github.com/joestump/reddium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-2 mx-1 p-2 pl-0 pb-3 cursor-pointer w-full max-w-full btn-black text-white rounded">
                    ✨ Star on GitHub
                  </button>
                </a>
              )}
              {showKofiLink && (
                <a
                  href="https://ko-fi.com/joestump"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-2 mx-1 p-2 pl-0 pb-3 cursor-pointer w-full max-w-full btn-outline-black text-white rounded">
                    ☕ Buy me a coffee
                  </button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
