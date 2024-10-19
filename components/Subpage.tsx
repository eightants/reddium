import React from "react";
import { DOMAIN } from "../functions/constants";
import { Props } from "../interfaces";
import { NavMenu } from "./common";
import TitleHead from "./TitleHead";
import Logo from "./common/Logo";

const Subpage = ({
  children,
  title,
  subreddit,
  token,
  backgroundColor = "white"
}: Props) => (
  <div>
    <TitleHead title={title}>
      <meta name="description" content={`/r/${subreddit} on Reddium`} />
      <meta property="og:url" content={`${DOMAIN}/r/${subreddit}`} />
      <meta property="og:description" content={`/r/${subreddit} on Reddium`} />
      <meta property="og:image" content={`${DOMAIN}/reddium-sub.png`} />
    </TitleHead>
    <header
      style={{
        backgroundColor: backgroundColor
      }}
    >
      <nav className="flex items-center justify-center max-width-sub mx-auto z-50 h-16 lg:mx-12 sm:mx-6">
        <div className="flex-grow flex items-center">
          <Logo />
        </div>
        <NavMenu token={token}/>
      </nav>
    </header>
    {children}
  </div>
);

export default Subpage;
