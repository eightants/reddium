import { GetServerSideProps } from "next";
import {
  getProfile,
  getUserInfo,
  getUserPosts,
  getUserPostsClient,
} from "../../functions/service";
import React, { useState } from "react";
import Image from 'next/image';
import TitleHead from "../../components/TitleHead";
import { NavMenu } from "../../components/common";
import UserPost from "../../components/user-page/UserPost";
import UserComment from "../../components/user-page/UserComment";
import { getIntFromString } from "../../functions/common";
import { DOMAIN } from "../../functions/constants";
import Cookies from "cookies";
import Logo from '../../components/common/Logo';  // Import the Logo component

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("token") || "";
  try {
    const profile = await getProfile({ token });
    const posts = await getUserPosts({
      ...query,
      username: profile.name || "",
    });
    const userInfo = await getUserInfo({ ...query, username: profile.name });
    return {
      props: {
        postData: { ...posts },
        userInfo,
        params: {
          ...query,
          token: token,
          category: query.params ? query.params[0] : "",
        },
      },
    };
  } catch (error) {
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    res.end();
  }
  return { props: {} };
};

const MePage = ({ postData, userInfo, params }: any) => {
  const [{ posts, after }, setPostData] = useState(postData);
  // const [selectedParams, setSelectedParams] = useState({
  //   ...zipObject(POPULAR_PARAM_KEY, POPULAR_PARAM_DEFAULT),
  //   ...params
  // });
  const fetchMorePosts = async () => {
    const next = await getUserPostsClient({
      ...params,
      after: after,
    });
    setPostData({ posts: [...posts, ...next.posts], after: next.after });
  };
  return (
    <div>
      <TitleHead title={`${userInfo.name} – Reddium`}>
        <meta name="description" content={`${userInfo}'s posts on Reddium. `} />
        <meta property="og:url" content={`${DOMAIN}/user/${userInfo.name}`} />
        <meta
          property="og:description"
          content={`${userInfo}'s posts on Reddium. `}
        />
        <meta property="og:image" content={`${DOMAIN}/reddium-sub.png`} />
      </TitleHead>
      <div className="h-full hidden sm:flex py-3 px-8 items-center sub-bottom-border justify-end max-width-main mx-auto z-50 h-16">
        <div className="flex flex-row items-center">
          <NavMenu token={params.token} />
          <a href="/">
            <div className="ml-4 h-6 logo-opacity">
              <Logo />
            </div>
          </a>
        </div>
      </div>
      <header className="sub-bottom-border h-160">
        <nav className="h-full flex px-4 items-center justify-center max-width-main mx-auto z-50 h-16 lg:mx-12 sm:mx-6 sm:px-0">
          <div className="flex w-full items-center justify-center">
            <div className="flex-grow flex items-center flex-row sm:flex-col sm:items-start">
              <div className="mr-8 flex flex-row items-center cursor-pointer">
                <a className="main-black" href={`/user/${userInfo.name}`}>
                  <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                </a>
              </div>
              <div className="flex flex-row items-center sub-link-grey sm:mt-2">
                <div className="mx-2 sm:ml-0">{`${userInfo.total_karma} Karma`}</div>
                <span className="px-2">·</span>
                <div className="mx-2">
                  <a
                    className="link-black-hover"
                    href={`/user/${userInfo.name}`}
                  >
                    Overview
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center sm:hidden">
              <NavMenu token={params.token} />
              <a href="/">
                <div className="ml-6 h-6 logo-opacity">
                  <Logo />
                </div>
              </a>
            </div>
          </div>
        </nav>
      </header>
      <section className="mt-12">
        <div className="max-width-main mx-auto flex flex-row">
          <div className="w-user w-full pl-4 lg:hidden pt-12">
            <div className="w-132 flex flex-col text-sm top-150 sticky">
              <Image 
                className="w-full mb-8" 
                src={`/avatars/avatar_${getIntFromString(userInfo.name, 18)}.jpg`} 
                alt={`${userInfo.name}'s avatar`}
                width={132}
                height={132}
              />
              <div className="uppercase sub-opacity-54 font-normal tracking-wide mb-2">
                About
              </div>
              <h2 className="font-normal tracking-wide mb-1">
                {userInfo.name}
              </h2>
              <div className="sub-opacity-54 mb-2">
                {`${userInfo.total_karma} Karma`}
              </div>
            </div>
          </div>
          <div className="w-full mx-auto max-w-[80%] pb-10">
            {posts.map((item: any, ind: number) =>
              item.kind == "t3" ? (
                <UserPost key={ind} {...item} />
              ) : (
                <UserComment key={ind} {...item} />
              )
            )}
            <div className="w-full text-center">
              <button
                className="my-4 mx-auto p-2 cursor-pointer w-48 max-w-full load-more main-black font-semibold rounded flex flex-row justify-between items-center"
                onClick={fetchMorePosts}
              >
                <div className="flex-grow text-center">Show More</div>
                <Image 
                  className="ml-3" 
                  src="/down_arrow.svg" 
                  alt="Show more"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div className="w-full w-user lg:hidden"></div>
        </div>
      </section>
    </div>
  );
};

export default MePage;
