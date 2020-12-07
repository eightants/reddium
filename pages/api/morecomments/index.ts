import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { link_id, children, token = "" } = JSON.parse(req.body);
  const url = `https://oauth.reddit.com/api/morechildren?api_type=json&link_id=${link_id}&children=${children}`;
  const headerOptions = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const resp = await (await fetch(url, headerOptions)).json();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
}
