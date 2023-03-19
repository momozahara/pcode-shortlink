// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma/client";

const notAllowSlug = ["get", "md", "sh", "api", "pcode"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: 405,
      message: "Method Not Allowed",
    });
  }

  const slug: string = req.body.slug;
  const url: string = req.body.url;

  if (!slug || !url) {
    return res.status(404).json({
      status: 404,
      message: "Missing Parameter",
    });
  }

  let slugStr = slug.toLowerCase();

  if (notAllowSlug.some((e) => e === slugStr)) {
    return res.status(404).json({
      status: 400,
      subStatus: 2,
      message: `Cannot Use ${slug}`,
    });
  }

  const expression =
    /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

  const regex = new RegExp(expression);

  if (!regex.test(url)) {
    return res.status(400).json({
      status: 400,
      subStatus: 1,
      message: "Given Url Is Not Match",
    });
  }

  try {
    let result = await prisma.shortLink.create({
      data: {
        key: slugStr,
        target: url,
      },
    });
    return res.status(200).json({
      status: 200,
      slug: result.key,
      target: result.target,
    });
  } catch (_) {
    return res.status(400).json({
      status: 400,
      subStatus: 2,
      message: "Key Already Existed",
    });
  }
}
