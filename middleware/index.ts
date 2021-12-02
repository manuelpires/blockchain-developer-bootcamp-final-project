import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import CONTRACT from "../artifacts/contracts/UntitledSnakesProject.sol/UntitledSnakesProject.json";

const infuraProvider = new ethers.providers.InfuraProvider(
  Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  [process.env.INFURA_KEY]
);
const wallet = new ethers.Wallet(
  process.env.NODE_WALLET_PRIVATE_KEY as string,
  infuraProvider
);
const signer = wallet.connect(infuraProvider);
const contract = new ethers.Contract(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
  CONTRACT.abi,
  signer
);

const isTokenIdValid = (tokenId: string) => {
  const id = parseInt(tokenId);
  return /^\d+$/.test(tokenId) && id >= 0 && id <= 100;
};

const hasTokenBeenMinted = async (tokenId: string) => {
  const supply = await contract.totalSupply();
  return parseInt(tokenId) < supply.toNumber();
};

const middleware =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { tokenId },
    } = req;
    if (
      !isTokenIdValid(String(tokenId)) ||
      !(await hasTokenBeenMinted(String(tokenId)))
    ) {
      return res.status(404).end();
    }
    return handler(req, res);
  };

export default middleware;
