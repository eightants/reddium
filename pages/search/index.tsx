import { GetServerSideProps } from "next";
import React, { useState } from "react";
import TitleHead from "../../components/TitleHead";
import {
  Dropdown,
  NavMenu,
  SubredditCard,
  UserCard
} from "../../components/common";
import SearchPost from "../../components/search-page/SearchPost";
import {
  DOMAIN,
  SEARCH_PARAM_DEFAULT,
  SEARCH_PARAM_KEY,
  SEARCH_PARAM_VALUES,
  SORT_PARAM,
  TIME_FILTER
} from "../../functions/constants";
import { zipObject } from "lodash";
import Cookies from "cookies";
import { getSearch, getSearchClient } from "../../functions/service";
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query
}) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("token") || "";
  const items = await getSearch({ ...query, token });
  return {
    props: {
      searchRes: { ...items },
      params: {
        ...query,
        token: token
      }
    }
  };
};

const SearchPage = ({ searchRes, params }: any) => {
  const [{ items, after }, setSearchData] = useState(searchRes);
  const [searchTerm, setSearchTerm] = useState(params.q);
  const [selectedParams, setSelectedParams] = useState({
    ...zipObject(SEARCH_PARAM_KEY, SEARCH_PARAM_DEFAULT),
    ...params
  });

  const filterPopular = () => {
    window.location.href = `/search/?q=${searchTerm}&sort=${selectedParams.sort}&t=${selectedParams.t}`;
  };
  const fetchMorePosts = async () => {
    const next = await getSearchClient({
      ...params,
      after: after
    });
    setSearchData({ items: [...items, ...next.items], after: next.after });
  };

  const newSearch = () => (window.location.href = `/search/?q=${searchTerm}`);

  return (
    <div>
      <TitleHead title={`Search - Reddium`}>
        <meta
          name="description"
          content={`Results for '${params.q}' on Reddium. `}
        />
        <meta property="og:url" content={`${DOMAIN}/search/?q=${params.q}`} />
        <meta
          property="og:description"
          content={`Results for '${params.q}' on Reddium. `}
        />
        <meta property="og:image" content={`${DOMAIN}/reddium-sub.png`} />
      </TitleHead>
      <header className="navbar-shadow">
        <nav className=" flex items-center justify-center max-width-sub mx-auto z-50 h-16 lg:mx-12 sm:mx-6 sm:h-14">
          <div className="flex-grow flex items-center">
            <a href="/">
              <div className="pr-4 h-8 flex flex-row items-center cursor-pointer">
                <Image src="/reddium_symbol.svg" alt="Reddium symbol" width={48} height={32} />
                <h1 className="ml-2 site-name text-3xl tracking-tighter text-black sm:hidden">
                  Reddium
                </h1>
              </div>
            </a>
          </div>
          <NavMenu token={params.token}/>
        </nav>
      </header>
      <section className="lg:w-auto lg:mx-12 sm:mx-2">
        <div className="w-full main-container max-width-sub pb-4 pt-10 px-8 sub-top-border lg:flex sm:px-0">
          <div className="px-4 pb-6 w-full">
            <input
              className="w-full search-input h-20 text-5xl main-black sm:text-3xl sm:h-16"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && newSearch()}
            />
          </div>
          <div className="w-full">
            <nav className="px-4 mb-10 w-full">
              <ul className="whitespace-no-wrap text-sm w-full">
                <li className="sub-link-grey mr-6 inline-block">
                  <a
                    href={`/search/?q=${params.q}&type=`}
                    className={`link-black-hover ${
                      params.type == "sr,user" ? "" : "main-black font-bold"
                    }`}
                  >
                    Stories
                  </a>
                </li>
                <li className="sub-link-grey mr-6 inline-block">
                  <a
                    href={`/search/?q=${params.q}&type=sr%2Cuser`}
                    className={`link-black-hover ${
                      params.type == "sr,user" ? "main-black font-bold" : ""
                    }`}
                  >
                    Publications and People
                  </a>
                </li>
              </ul>
            </nav>
            <div className="main-black overflow-hidden w-full">
              <div className="w-9/12 px-4 float-left sm:w-full">
                <header className="sub-top-border sm:border-0">
                  <h3 className="pt-4 mb-10 uppercase tracking-wider sm:hidden">
                    {params.type == "sr,user"
                      ? "Publications and People"
                      : "Stories"}
                  </h3>
                </header>
                <div className="hidden md:block mb-8">
                  <Dropdown
                    key={SORT_PARAM}
                    id={SORT_PARAM}
                    paramKey={SEARCH_PARAM_KEY}
                    paramVal={SEARCH_PARAM_VALUES}
                    dataObj={selectedParams}
                    updateParams={setSelectedParams}
                  />
                  {selectedParams.sort != "new" ? (
                    <Dropdown
                      key={TIME_FILTER}
                      id={TIME_FILTER}
                      paramKey={SEARCH_PARAM_KEY}
                      paramVal={SEARCH_PARAM_VALUES}
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
                <div>
                  {items.length < 1 ? (
                    <h2 className="text-3xl leading-6 sm:text-2xl">
                      No results found.{" "}
                    </h2>
                  ) : (
                    items.map((item: any, ind: number) =>
                      item.kind == "t3" ? (
                        <SearchPost key={ind} {...item} token={params.token} />
                      ) : item.kind == "t5" ? (
                        <SubredditCard key={ind} {...item} />
                      ) : (
                        <UserCard key={ind} {...item} />
                      )
                    )
                  )}
                  {after ? (
                    <button
                      className="mb-8 mx-auto p-2 cursor-pointer w-48 max-w-full load-more main-black font-semibold rounded flex flex-row justify-between items-center"
                      onClick={fetchMorePosts}
                    >
                      <div className="flex-grow text-center">Show More</div>
                      <Image src="/down_arrow.svg" alt="Down arrow" width={24} height={24} className="ml-3" />
                    </button>
                  ) : (
                    <div className="py-10"></div>
                  )}
                </div>
              </div>
              <div className="w-3/12 px-4 float-right md:hidden">
                <header className="sub-top-border sm:border-0">
                  <h3 className="pt-4 mb-10 uppercase tracking-wider sm:hidden">
                    Filter
                  </h3>
                </header>
                <Dropdown
                  key={SORT_PARAM}
                  id={SORT_PARAM}
                  paramKey={SEARCH_PARAM_KEY}
                  paramVal={SEARCH_PARAM_VALUES}
                  dataObj={selectedParams}
                  updateParams={setSelectedParams}
                />
                {selectedParams.sort != "new" ? (
                  <Dropdown
                    key={TIME_FILTER}
                    id={TIME_FILTER}
                    paramKey={SEARCH_PARAM_KEY}
                    paramVal={SEARCH_PARAM_VALUES}
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
      </section>
    </div>
  );
};

export default SearchPage;
