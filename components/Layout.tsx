import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Props } from "../interfaces";

const Layout = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="flex items-center justify-center max-width-main mx-auto z-50 h-16 my-6">
        <div className="flex-grow flex items-center">
          <div className="pr-4 nav-img h-8">
            <img className="h-full" src="medium_symbol.svg" />
          </div>
          <div className="pl-4">
            <h1 className="font-bold text-lg leading-6 nav-greeting">
              Good morning
            </h1>
          </div>
        </div>
        <button className="my-4 p-2 px-6 text-sm cursor-pointer max-w-full btn-outline-black rounded">
          Get Started
        </button>
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
