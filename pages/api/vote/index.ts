import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postid, token, dir = 1 } = JSON.parse(req.body);
  const headerOptions = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    await fetch(
      `https://oauth.reddit.com/api/vote?id=${postid}&dir=${dir}`,
      headerOptions
    );
    res.status(200).json({});
  } catch (error) {
    res.status(400).json(error);
  }
}
