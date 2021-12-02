import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../../middleware";

// GET /api/snake/:tokenId
const handler = async (
  { query: { tokenId } }: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const response = await fetch(
      `${process.env.IPFS_METADATA_BASE_URI}${tokenId}`
    );
    const json = await response.json();
    json.image = `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}${tokenId}`;
    res
      .setHeader("Cache-Control", "max-age=0, s-maxage=31536000")
      .status(200)
      .json(json);
  } catch (err) {
    res.status(500).end();
  }
};

export default middleware(handler);
