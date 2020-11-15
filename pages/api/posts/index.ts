import { SPECIAL_SUBREDDITS } from "../../../functions/constants";
import { Post, QueryParams } from "../../../interfaces";

export function getPosts() {
  return fetch("https://www.reddit.com/r/all/hot.json?limit=25");
}

export async function getPopularPosts({
  subreddit = "popular",
  sort_type = "hot",
  t = "day",
  limit = 25,
  after = ""
}: QueryParams) {
  const res = await (
    await fetch(
      `https://www.reddit.com/r/${subreddit}/${sort_type}.json?limit=${limit}&after=${after}&t=${t}`
    )
  ).json();
  const postList = await res.data.children;
  const posts: Post[] = postList.map((post: any) => post.data);
  return {
    posts: posts,
    after: res.data.after
  };
}

export async function getSubredditInfo({ subreddit }: QueryParams) {
  if (subreddit && SPECIAL_SUBREDDITS.includes(subreddit)) return {};
  const res = await (
    await fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
  ).json();
  return res.data;
}

export async function getPostInfo({
  subreddit,
  postid,
  commentid
}: QueryParams) {
  const postReq = commentid == "" ? postid : `${postid}/eightants/${commentid}`;
  const res = await (
    await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${postReq}.json`
    )
  ).json();
  if (!res.hasOwnProperty("error")) {
    const comments: Post[] = res[1].data.children.map((post: any) => post.data);
    return {
      post: res[0].data.children[0].data,
      comments: comments
    };
  }
  return res;
}

export async function getUserPosts({
  username,
  sort = "new",
  category = "",
  t = "day",
  after = ""
}: any) {
  const res = await (
    await fetch(
      `https://www.reddit.com/user/${username}/${category}.json?sort=${sort}&after=${after}&t=${t}`
    )
  ).json();
  const postList = await res.data.children;
  const posts: Post[] = postList.map((post: any) => ({
    ...post.data,
    kind: post.kind
  }));
  return {
    posts: posts,
    after: res.data.after
  };
}

export async function getUserInfo({ username }: any) {
  const res = await (
    await fetch(`https://www.reddit.com/user/${username}/about.json`)
  ).json();
  return res.data;
}

export async function getSearch({ q, type = "", after = "" }: any) {
  const res = await (
    await fetch(
      `https://www.reddit.com/search/.json?q=${q}&type=${type}&after=${after}`
    )
  ).json();
  const resList = await res.data.children;
  const items: any[] = resList.map((item: any) => ({
    ...item.data,
    kind: item.kind
  }));
  return {
    items: items,
    after: res.data.after
  };
}
