const { ethers, upgrades } = require("hardhat");
const writeAbi = require("./writeAbi.js");

async function main() {
  const SaintQuartz = await ethers.getContractFactory("SaintQuartz");
  const saintQuartz = await upgrades.deployProxy(SaintQuartz, {kind: "uups"});
  await saintQuartz.deployed();
  console.log(`Deployed to proxy contract: ${saintQuartz.address}`);
  const saintQuartzAddress = await upgrades.erc1967.getImplementationAddress(saintQuartz.address);
  console.log(`Implementation address: ${saintQuartzAddress}`);

  writeAbi();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
