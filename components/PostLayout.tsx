import React from "react";
import { Props } from "../interfaces";
import { NavMenu } from "./common";
import TitleHead from "./TitleHead";

const PostLayout = ({ children, title }: Props) => (
  <div>
    <TitleHead title={title} />
    <header>
      <nav className="flex px-4 items-center justify-center max-width-main mx-auto z-50 h-16 lg:mx-12 sm:mx-6 sm:px-0">
        <div className="flex-grow flex items-center">
          <a href="/">
            <div className="pr-4 h-6 flex flex-row items-center cursor-pointer">
              <img className="h-full sm:h-6" src="/reddium_symbol.svg" />
            </div>
          </a>
        </div>
        <NavMenu />
      </nav>
    </header>
    {children}
  </div>
);

export default PostLayout;
