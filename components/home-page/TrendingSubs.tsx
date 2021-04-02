import React from "react";

const TrendingSubs = (trendingSubs: any) => (
  <div className="mb-6">
    <div className="mb-5">
      <p className="heading-text text-sm leading-4 uppercase tracking-wide sm:text-xs">
        Trending subreddits
      </p>
    </div>
    <div>
      {trendingSubs.hasOwnProperty("posts") ? (
        trendingSubs.posts[0].title
          .split(":")[1]
          .split(",")
          .slice(0, 3)
          .map((sub: string, ind: number) => (
            <div
              key={ind}
              className="mb-3 pb-3 sub-bottom-border justify-between flex items-center"
            >
              <a className="heading-text tracking-wide" href={sub}>
                {sub}
              </a>
              <a href={sub}>
                <button className="px-3 py-1 cursor-pointer rounded btn-outline-green text-sm">
                  Visit
                </button>
              </a>
            </div>
          ))
      ) : (
        <div className="shimmer">
          <div className="h-4 w-full mb-5 mx-3 pb-3 shimmer-bg"></div>
          <div className="h-4 w-full mb-5 mx-3 pb-3 shimmer-bg"></div>
          <div className="h-4 w-full mb-5 mx-3 pb-3 shimmer-bg"></div>
        </div>
      )}
      <a className="main-green text-sm" href="/r/trendingsubreddits">
        See More
      </a>
    </div>
  </div>
);

export default TrendingSubs;
