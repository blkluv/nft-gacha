import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Saint Quartz contract", function () {
  async function deployFixture() {
    const SaintQuartzContract = await ethers.getContractFactory("SaintQuartz");
    const saintQuartzContract = await SaintQuartzContract.deploy();
    await saintQuartzContract.deployed();
    await saintQuartzContract.initialize();

    return { saintQuartzContract };
  }

  describe("SQ Packages", function () {
    it("Fetch Saint Quartz package list", async function () {
      const packageListLength = 6;
      const lastPackageAmount = 168;
      const { saintQuartzContract } = await loadFixture(deployFixture);
      const packages = await saintQuartzContract.getSqPackages();
      const lastElement = packages[packages.length - 1];

      expect(packages.length).to.equal(packageListLength);
      expect(lastElement.amount).to.equal(lastPackageAmount);
    });
  });

  describe("Minting", function () {
    async function signTypedData(signer: SignerWithAddress, contractAddress: string, packageIndex: number) {

      const value = {
        user: signer.address,
        packageIndex,
      };
  
      const signature = await signer._signTypedData(
        {
          name: "SQDomain",
          version: "1",
          chainId: 1337,
          verifyingContract: contractAddress
        }, {
          SQSigner: [
              { name: "user", type: "address" },
              { name: "packageIndex", type: "uint256" },
          ]
        }, value);
  
      return {
        ...value,
        signature
      };
    }

    it("Saint Quartz minted", async function () {
      const packageIndex = 2;
      const [, user] = await ethers.getSigners();
      const { saintQuartzContract } = await loadFixture(deployFixture);

      const signedData = await signTypedData(user, saintQuartzContract.address, packageIndex);
      await saintQuartzContract.connect(user).mint(signedData);

      const packages = await saintQuartzContract.getSqPackages();
      const balance = await saintQuartzContract.balanceOf(user.address);

      expect(Number(balance)).to.equal(Number(packages[packageIndex].amount));
    });

    it("Not mintable when paused", async function () {
      const packageIndex = 2;
      const [owner, user] = await ethers.getSigners();
      const { saintQuartzContract } = await loadFixture(deployFixture);

      const signedData = await signTypedData(user, saintQuartzContract.address, packageIndex);
      await saintQuartzContract.connect(owner).pause();

      expect(saintQuartzContract.connect(user).mint(signedData)).to.be.revertedWith("Pausable: paused");
    });
  });
});
