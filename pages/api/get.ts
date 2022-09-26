// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Client from "prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: 405,
      message: "Method Not Allowed",
    });
  }

  const slug = req.query.slug;

  if (!slug) {
    return res.status(404).json({
      status: 404,
      message: "Missing Parameter",
    });
  }

  let slugStr = slug.toString().toLowerCase();

  const result = await Client.shortLink.findUnique({
    where: {
      key: slugStr,
    },
  });

  if (!result) {
    return res.status(404).json({
      status: 404,
      message: "Not Found",
    });
  }

  return res.status(200).json({
    status: 200,
    url: result.target,
  });
}
