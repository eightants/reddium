import { Post, QueryParams } from "../../../interfaces";

export function getPosts() {
    return fetch("https://www.reddit.com/r/all/hot.json?limit=25")
}

export async function getPopularPosts({ subreddit="popular", sort_type="hot", geo_filter="GLOBAL", t="day", limit=25, after=""}: QueryParams) {
  const res = await (await fetch(`https://www.reddit.com/r/${subreddit}/${sort_type}.json?geo_filter=${geo_filter}&limit=${limit}&after=${after}&t=${t}`)).json();
  const postList = await res.data.children;
  const posts: Post[] = postList.map((post: any) => post.data);
  return {
      posts: posts, 
      after: res.data.after
  }
}