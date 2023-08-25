const {ethers, upgrades} = require("hardhat");
const writeAbi = require("./writeAbi.ts");

async function main() {

  const SaintQuartz = await ethers.getContractFactory("SaintQuartz");
  const saintQuartz = await upgrades.deployProxy(SaintQuartz, {kind: "uups"});
  await saintQuartz.deployed();
  console.log(`Deployed to proxy: ${saintQuartz.address}`);
  const saintQuartzAddress = await upgrades.erc1967.getImplementationAddress(saintQuartz.address);
  console.log(`Saint Quartz contract deployed to ${saintQuartzAddress}`);

  writeAbi();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
