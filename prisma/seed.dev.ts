import { Prisma, PrismaClient, ShortLink } from "@prisma/client";

const prisma = new PrismaClient();

const shortData: Prisma.ShortLinkCreateInput[] = [
  {
    key: "pcode",
    target: "https://pcode.dev",
  },
  {
    key: "google",
    target: "https://www.google.com",
  },
  {
    key: "p",
    target: "https://pcode.dev",
  },
  {
    key: "pp",
    target: "https://pcode.dev",
  },
  {
    key: "ppp",
    target: "https://pcode.dev",
  },
  {
    key: "pppp",
    target: "https://pcode.dev",
  },
  {
    key: "ppppp",
    target: "https://pcode.dev",
  },
  {
    key: "g",
    target: "https://www.google.com",
  },
  {
    key: "gg",
    target: "https://www.google.com",
  },
  {
    key: "ggg",
    target: "https://www.google.com",
  },
  {
    key: "gggg",
    target: "https://www.google.com",
  },
  {
    key: "ggggg",
    target: "https://www.google.com",
  },
];

const seedShortLinks = async () => {
  const shortLinks = await prisma.shortLink.findMany();
  let result: ShortLink[] = [];
  for (const s of shortData) {
    const _isExist = shortLinks.find((x) => x.key === s.key);
    if (_isExist) {
      continue;
    }
    const _shortLink = await prisma.shortLink.create({
      data: s,
    });
    result.push(_shortLink);
  }
  return result;
};

const start = async () => {
  const shortLink = await seedShortLinks();
  console.log(shortLink);
};

start();
