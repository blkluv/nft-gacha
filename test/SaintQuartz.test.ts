import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Saint Quartz contract", function () {
  async function deployFixture() {
    const SaintQuartz = await ethers.getContractFactory("SaintQuartz");
    const saintQuartz = await SaintQuartz.deploy();
    await saintQuartz.deployed();
    await saintQuartz.initialize();

    return { saintQuartz };
  }

  describe("SQ Packages", function () {
    it("Fetch Saint Quartz package list", async function () {
      const packageListLength = 6;
      const lastPackageAmount = 168;
      const { saintQuartz } = await loadFixture(deployFixture);
      const packages = await saintQuartz.getSqPackages();
      const lastElement = packages[packages.length - 1];

      expect(packages.length).to.equal(packageListLength);
      expect(lastElement.amount).to.equal(lastPackageAmount);
    });
  });
});
