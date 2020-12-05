// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

import { ReactNode } from "react";

export type User = {
  id: number;
  name: string;
};

export type Post = {
  subreddit: string;
  subreddit_name_prefixed: string;
  author: string;
  title: string;
  ups: number;
  url: string;
  permalink: string;
  selftext: string;
  num_comments: number;
  thumbnail?: string;
  created_utc: number;
  name: string;
  likes?: boolean;
  saved?: boolean;
  token?: string;
};

export type Props = {
  children?: ReactNode;
  title?: string;
  backgroundColor?: string;
  subreddit?: string;
  permalink?: string;
  thumbnail?: string;
  token?: string;
};

export type DropdownProps = {
  id: string;
  dataObj: any;
  paramKey: Array<string>;
  paramVal: Array<Array<string>>;
  updatePosts?: any;
  updateParams?: any;
};

export type QueryParams = {
  subreddit?: string;
  sort_type?: string;
  geo_filter?: string;
  limit?: number;
  after?: string;
  t?: string;
  postid?: string;
  commentid?: string;
  sort?: string;
  token?: string;
};

export type PostList = {
  posts?: Post[];
  after?: string;
};
