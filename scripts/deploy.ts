import { ethers } from "hardhat";

const main = async () => {
  const UntitledSnakesProject = await ethers.getContractFactory(
    "UntitledSnakesProject"
  );
  const contract = await UntitledSnakesProject.deploy(
    ethers.utils.parseEther("0.001"),
    "https://untitled-snakes-project.vercel.app/api/snake/"
  );
  await contract.deployed();
  console.log("UntitledSnakesProject contract address:", contract.address);
};

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
