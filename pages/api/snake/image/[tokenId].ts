import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../../../middleware";

// GET /api/snake/image/:tokenId
const handler = async (
  { query: { tokenId } }: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const response = await fetch(
      `${process.env.IPFS_IMAGES_BASE_URI}${tokenId}.png`
    );
    const arrayBuffer = await response.arrayBuffer();
    res
      .setHeader("Content-Type", "image/png")
      .setHeader("Cache-Control", "max-age=0, s-maxage=31536000")
      .status(200)
      .end(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(500).end();
  }
};

export default middleware(handler);
