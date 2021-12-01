import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const {
  BigNumber,
  getContractFactory,
  getSigners,
  provider: { getBalance },
  utils: { parseEther },
} = ethers;

/**
 * All tests for the UntitledSnakesProject contract with full code coverage.
 */
describe("UntitledSnakesProject contract", function () {
  let UntitledSnakesProject;
  let contract: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  /**
   * Hook that is ran before each test is executed.
   * Deploys the contract and gets the signers addresses.
   */
  beforeEach(async function () {
    UntitledSnakesProject = await getContractFactory("UntitledSnakesProject");
    [owner, addr1, addr2, ...addrs] = await getSigners();
    contract = await UntitledSnakesProject.deploy(
      parseEther("0.1"),
      "https://untitled-snakes-project.vercel.app/api/snake/"
    );
  });

  /**
   * Deployment tests.
   * Verify that all variables are correctly set after deployment.
   */
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should set the right constant values for MAX_TOKENS, MAX_TOKENS_PER_TX and MAX_TOKENS_GIVEAWAYS", async function () {
      expect(await contract.MAX_TOKENS()).to.equal(BigNumber.from(100));
      expect(await contract.MAX_TOKENS_PER_TX()).to.equal(BigNumber.from(2));
      expect(await contract.MAX_TOKENS_GIVEAWAYS()).to.equal(
        BigNumber.from(10)
      );
    });

    it("Should set the right default values for provenanceHash and isSaleActive", async function () {
      expect(await contract.provenanceHash()).to.equal("");
      expect(await contract.isSaleActive()).to.be.false;
    });

    it("Should set the right name and symbol", async function () {
      expect(await contract.name()).to.equal("UntitledSnakesProject");
      expect(await contract.symbol()).to.equal("SNAKE");
    });

    it("Should set the right price and baseURI", async function () {
      expect(await contract.price()).to.equal(parseEther("0.1"));
      expect(await contract.baseURI()).to.equal(
        "https://untitled-snakes-project.vercel.app/api/snake/"
      );
    });
  });

  /**
   * Setters tests.
   * Verify that all setters functions work as expected.
   */
  describe("Setters", function () {
    it("Should set a new baseURI correctly", async function () {
      await contract.setBaseURI("https://new-base-uri.com/");
      expect(await contract.baseURI()).to.equal("https://new-base-uri.com/");
    });

    it("Should revert setBaseURI call if caller is not the owner", async function () {
      await expect(
        contract.connect(addr1).setBaseURI("https://new-base-uri.com/")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should set a new price correctly", async function () {
      await contract.setPrice(parseEther("1"));
      expect(await contract.price()).to.equal(parseEther("1"));
    });

    it("Should revert setPrice call if caller is not the owner", async function () {
      await expect(
        contract.connect(addr1).setPrice(parseEther("1"))
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should set the provenance hash correctly", async function () {
      await contract.setProvenanceHash(
        "f1bd97babbe603d15e1c850eb0c63b3fb68e52c520fce11388ba3d4f85347290"
      );
      expect(await contract.provenanceHash()).to.equal(
        "f1bd97babbe603d15e1c850eb0c63b3fb68e52c520fce11388ba3d4f85347290"
      );
    });

    it("Should revert setProvenanceHash call if caller is not the owner", async function () {
      await expect(
        contract
          .connect(addr1)
          .setProvenanceHash(
            "f1bd97babbe603d15e1c850eb0c63b3fb68e52c520fce11388ba3d4f85347290"
          )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should toggle the sale status correctly", async function () {
      await contract.toggleSaleStatus();
      expect(await contract.isSaleActive()).to.be.true;
    });

    it("Should revert toggleSaleStatus call if caller is not the owner", async function () {
      await expect(
        contract.connect(addr1).toggleSaleStatus()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  /**
   * Mint tests.
   * Verify that the mint function works as expected.
   */
  describe("Mint", function () {
    it("Should mint tokens successfully", async function () {
      await contract.toggleSaleStatus();
      await contract.mint(2, {
        value: parseEther("0.2"),
      });
      expect(await getBalance(contract.address)).to.equal(parseEther("0.2"));
      expect(await contract.totalSupply()).to.equal(BigNumber.from(2));
    });

    it("Should revert mint call if sale is not active", async function () {
      await expect(
        contract.mint(1, { value: parseEther("0.1") })
      ).to.be.revertedWith("Sale is not active");
    });

    it("Should revert mint call if number of tokens to mint is set to 0", async function () {
      await contract.toggleSaleStatus();
      await expect(contract.mint(0)).to.be.revertedWith("Invalid mint amount");
    });

    it("Should revert mint call if number of tokens to mint is bigger than 2", async function () {
      await contract.toggleSaleStatus();
      await expect(
        contract.mint(3, { value: parseEther("0.3") })
      ).to.be.revertedWith("Invalid mint amount");
    });

    it("Should revert mint call if purchase would exceed max supply", async function () {
      await contract.toggleSaleStatus();
      for (let i = 0; i < 50; i++) {
        await contract.mint(2, {
          value: parseEther("0.2"),
        });
      }
      await expect(
        contract.mint(1, { value: parseEther("0.1") })
      ).to.be.revertedWith("Would exceed max supply");
    });

    it("Should revert mint call if ether value sent is not enough", async function () {
      await contract.toggleSaleStatus();
      await expect(
        contract.mint(1, { value: parseEther("0.0999") })
      ).to.be.revertedWith("Ether value sent is not enough");
      await expect(
        contract.mint(2, { value: parseEther("0.1999") })
      ).to.be.revertedWith("Ether value sent is not enough");
    });
  });

  /**
   * Giveaway tests.
   * Verify that the giveaway function works as expected.
   */
  describe("Giveaway", function () {
    it("Should giveaway tokens successfully", async function () {
      await contract.giveaway(addr1.address, 2);
      expect(await contract.totalSupply()).to.equal(BigNumber.from(2));
    });

    it("Should revert giveaway call if caller is not the owner", async function () {
      await expect(
        contract.connect(addr1).giveaway(addr1.address, 1)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should revert giveaway call if number of tokens to giveaway is set to 0", async function () {
      await expect(contract.giveaway(addr1.address, 0)).to.be.revertedWith(
        "Invalid giveaway amount"
      );
    });

    it("Should revert giveaway call if number of tokens to giveaway is bigger than 2", async function () {
      await expect(contract.giveaway(addr1.address, 3)).to.be.revertedWith(
        "Invalid giveaway amount"
      );
    });

    it("Should revert giveaway call if supply would exceed max giveaway tokens", async function () {
      for (let i = 0; i < 5; i++) {
        await contract.giveaway(addr1.address, 2);
      }
      await expect(contract.giveaway(addr2.address, 1)).to.be.revertedWith(
        "Would exceed max giveaway tokens"
      );
    });

    it("Should revert giveaway call if supply would exceed max giveaway tokens because of previous mints", async function () {
      await contract.toggleSaleStatus();
      for (let i = 0; i < 5; i++) {
        await contract.connect(addr1).mint(2, {
          value: parseEther("0.2"),
        });
      }
      await expect(contract.giveaway(addr2.address, 1)).to.be.revertedWith(
        "Would exceed max giveaway tokens"
      );
    });
  });

  /**
   * Read tests.
   * Verify that all the read functions work as expected.
   */
  describe("Read", function () {
    it("Should return a totalSupply equal to 0", async function () {
      expect(await contract.totalSupply()).to.equal(BigNumber.from(0));
    });

    it("Should return the right totalSupply after minting", async function () {
      await contract.toggleSaleStatus();
      await contract.mint(1, {
        value: parseEther("0.1"),
      });
      await contract.connect(addr1).mint(1, {
        value: parseEther("0.1"),
      });
      expect(await contract.totalSupply()).to.equal(BigNumber.from(2));
    });

    it("Should return empty walletOfOwner if no tokens are owned by address", async function () {
      expect(await contract.walletOfOwner(owner.address)).to.eql([]);
    });

    it("Should return the right walletOfOwner after calling giveaway and mint", async function () {
      await contract.giveaway(owner.address, 2);
      await contract.toggleSaleStatus();
      await contract.connect(addr1).mint(1, {
        value: parseEther("0.1"),
      });
      await contract.connect(addr2).mint(2, {
        value: parseEther("0.2"),
      });
      expect(await contract.walletOfOwner(owner.address)).to.eql(
        [0, 1].map((i) => BigNumber.from(i))
      );
      expect(await contract.walletOfOwner(addr1.address)).to.eql(
        [2].map((i) => BigNumber.from(i))
      );
      expect(await contract.walletOfOwner(addr2.address)).to.eql(
        [3, 4].map((i) => BigNumber.from(i))
      );
    });

    it("Should return the right tokenURIs after minting", async function () {
      await contract.toggleSaleStatus();
      await contract.mint(2, {
        value: parseEther("0.2"),
      });
      expect(await contract.tokenURI(0)).to.equal(
        "https://untitled-snakes-project.vercel.app/api/snake/0"
      );
      expect(await contract.tokenURI(1)).to.equal(
        "https://untitled-snakes-project.vercel.app/api/snake/1"
      );
    });

    it("Should revert tokenURI call if token is nonexistent", async function () {
      await expect(contract.tokenURI(0)).to.be.revertedWith(
        "ERC721Metadata: URI query for nonexistent token"
      );
    });
  });

  /**
   * Withdraw tests.
   * Verify that the withdraw function works as expected.
   */
  describe("Withdraw", function () {
    it("Should withdraw successfully", async function () {
      await contract.toggleSaleStatus();
      await contract.connect(addr1).mint(1, {
        value: parseEther("0.1"),
      });
      await contract.connect(addr2).mint(2, {
        value: parseEther("0.2"),
      });
      const initialOwnerBalance = await getBalance(owner.address);
      const tx = await contract.connect(owner).withdraw();
      const { cumulativeGasUsed } = await tx.wait();
      const txCost = cumulativeGasUsed.mul(tx.gasPrice);
      expect(await getBalance(contract.address)).to.equal(BigNumber.from(0));
      expect(await getBalance(owner.address)).to.equal(
        initialOwnerBalance.add(parseEther("0.3")).sub(txCost)
      );
    });

    it("Should revert withdraw call if caller is not the owner", async function () {
      await expect(contract.connect(addr1).withdraw()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });
});
