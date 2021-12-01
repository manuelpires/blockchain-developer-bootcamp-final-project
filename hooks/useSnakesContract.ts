import useContract from "./useContract";
import type { UntitledSnakesProject } from "../typechain-types";
import CONTRACT from "../artifacts/contracts/UntitledSnakesProject.sol/UntitledSnakesProject.json";

const useSnakesContract = () =>
  useContract<UntitledSnakesProject>(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
    CONTRACT.abi
  );

export default useSnakesContract;
