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
  const res = await (
    await fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
  ).json();
  return res.data;
}

export async function getPostInfo({ subreddit, postid }: QueryParams) {
    const res = await (
      await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postid}.json`)
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