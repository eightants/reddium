import React from "react";
import Link from 'next/link';

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
              <Link href={sub} className="heading-text tracking-wide">
                {sub}
              </Link>
              <Link href={sub}>
                <button className="px-3 py-1 cursor-pointer rounded btn-outline-green text-sm">
                  Visit
                </button>
              </Link>
            </div>
          ))
      ) : (
        <div className="shimmer">
          <div className="h-4 w-full mb-5 mx-3 pb-3 shimmer-bg"></div>
          <div className="h-4 w-full mb-5 mx-3 pb-3 shimmer-bg"></div>
          <div className="h-4 w-full mb-5 mx-3 pb-3 shimmer-bg"></div>
        </div>
      )}
      <Link href="/r/trendingsubreddits" className="main-green text-sm">
        See More
      </Link>
    </div>
  </div>
);

export default TrendingSubs;
