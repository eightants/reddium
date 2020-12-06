import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    q,
    sort = "relevance",
    t = "all",
    type = "",
    after = "",
    token = ""
  } = JSON.parse(req.body);
  const url =
    token != ""
      ? `https://oauth.reddit.com/search?q=${q}&sort=${sort}&t=${t}&after=${after}&type=${type}`
      : `https://www.reddit.com/search/.json?q=${q}&sort=${sort}&t=${t}&after=${after}&type=${type}`;
  const headerOptions =
    token != ""
      ? {
          headers: { Authorization: `Bearer ${token}` }
        }
      : {};
  try {
    const resp = await (await fetch(url, headerOptions)).json();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
}
