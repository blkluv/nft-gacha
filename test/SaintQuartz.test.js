const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Saint Quartz contract", () => {
  const packagePriceEth = ethers.utils.parseUnits("0.1", "ether");

  async function deployFixture() {
    const SaintQuartzContract = await ethers.getContractFactory("SaintQuartz");
    const saintQuartzContract = await SaintQuartzContract.deploy();
    await saintQuartzContract.deployed();
    await saintQuartzContract.initialize();

    const ServantsContract = await ethers.getContractFactory("Servants");
    const servantsContract = await ServantsContract.deploy();
    await servantsContract.deployed();
    await servantsContract.initialize(saintQuartzContract.address);

    return { saintQuartzContract, servantsContract };
  }

  async function signTypedData(signer, contractAddress, packageIndex) {
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

  describe("SQ Packages", () => {
    
    it("Fetch Saint Quartz package list", async () => {
      const packageListLength = 6;
      const lastPackageAmount = 168;
      const { saintQuartzContract } = await loadFixture(deployFixture);
      const packages = await saintQuartzContract.getSqPackages();
      const lastElement = packages[packages.length - 1];

      expect(packages.length).to.equal(packageListLength);
      expect(lastElement.amount).to.equal(lastPackageAmount);
    });
  });

  describe("Minting", () => {
    const packageIndex = 2;

    it("Expect Saint Quartz to be minted", async () => {
      const [, user] = await ethers.getSigners();
      const { saintQuartzContract } = await loadFixture(deployFixture);

      const signedData = await signTypedData(user, saintQuartzContract.address, packageIndex);
      await saintQuartzContract.connect(user).buySaintQuartz(signedData, { value: packagePriceEth });

      const packages = await saintQuartzContract.getSqPackages();
      const balance = await saintQuartzContract.balanceOf(user.address);

      expect(Number(balance)).to.equal(Number(packages[packageIndex].amount));
    });

    it("Reverted when contract is paused", async () => {
      const [owner, user] = await ethers.getSigners();
      const { saintQuartzContract } = await loadFixture(deployFixture);

      const signedData = await signTypedData(user, saintQuartzContract.address, packageIndex);
      await saintQuartzContract.connect(owner).pause();

      await expect(saintQuartzContract.connect(user).buySaintQuartz(signedData, {value: packagePriceEth}))
        .to.be.revertedWith('Pausable: paused');
    });

    it("Reverted when package index is invalid", async () => {
      const invalidPackageIndex = 6;
      const [, user] = await ethers.getSigners();
      const { saintQuartzContract } = await loadFixture(deployFixture);

      const signedData = await signTypedData(user, saintQuartzContract.address, invalidPackageIndex);

      await expect(saintQuartzContract.connect(user).buySaintQuartz(signedData, {value: packagePriceEth}))
        .to.be.revertedWith("Invalid package!");
    });
  });

  describe("Burning", () => {
    it("Expect Saint Quartz to be burned", async () => {
      const packageIndex = 3;
      const multiRollCost = 30;

      const [, user] = await ethers.getSigners();
      const { saintQuartzContract, servantsContract } = await loadFixture(deployFixture);

      const signedData = await signTypedData(user, saintQuartzContract.address, packageIndex);
      await saintQuartzContract.connect(user).buySaintQuartz(signedData, { value: packagePriceEth });
      await servantsContract.connect(user).rollServants();

      const packages = await saintQuartzContract.getSqPackages();
      const balance = await saintQuartzContract.balanceOf(user.address);
      const expectedBalance = Number(packages[packageIndex].amount) - multiRollCost;

      expect(Number(balance)).to.equal(expectedBalance);
    });
  });
});
