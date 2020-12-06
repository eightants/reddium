import React, { useState } from "react";
import { postSubscribe } from "../../functions/service";

const Header = ({ subreddit, user_is_subscriber, name, token }: any) => {
  const [following, setFollowing] = useState(user_is_subscriber);
  const castFollow = (action: string) => {
    if (token != "") {
      postSubscribe({ sub: name, action, token }).then(() => {
        if (action == "unsub") {
          setFollowing(false);
        } else {
          setFollowing(true);
        }
      });
    }
  };
  return (
    <header className="w-full blue-bg">
      <div className=" flex max-width-sub mx-auto flex-row items-center lg:w-auto lg:mx-12 sm:mx-6">
        <div>
          <h1 className="tracking-wide text-white heading-font">{`r/${subreddit}`}</h1>
        </div>
        <nav className="flex justify-between items-center flex-row leading-4 flex-grow py-4">
          <div></div>
          <div>
            {following ? (
              <button className="my-4 p-1 px-3 text-sm cursor-pointer max-w-full rounded bg-white blue-clr outline-1px border-white" onClick={() => castFollow("unsub")}>
                Followed
              </button>
            ) : (
              <button className="my-4 p-1 px-3 text-sm cursor-pointer max-w-full btn-outline-white rounded" onClick={() => castFollow("sub")}>
                Follow
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
