import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sub, token, action } = JSON.parse(req.body);
  const headerOptions = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    await fetch(
      `https://oauth.reddit.com/api/subscribe?sr=${sub}&action=${action}&action_source=a${
        action == "sub" ? "&skip_initial_defaults=true" : ""
      }`,
      headerOptions
    );
    res.status(200).json({});
  } catch (error) {
    res.status(400).json(error);
  }
}
