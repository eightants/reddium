import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    username,
    sort = "new",
    category = "",
    t = "day",
    token = "",
    after = ""
  } = JSON.parse(req.body);
  const url = `https://www.reddit.com/user/${username}/${category}.json?sort=${sort}&after=${after}&t=${t}`;
  const headerOptions =
    token != ""
      ? {
          headers: { Authorization: `Bearer ${token}` }
        }
      : {};
  try {
    const resp = await (await fetch(url, headerOptions)).json();
    console.log(resp);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
}
