import { ethers } from "hardhat";
import writeAbi from "./writeAbi";

async function main() {
  const SaintQuartz = await ethers.getContractFactory("SaintQuartz");
  const saintQuartz = await SaintQuartz.deploy();
  await saintQuartz.deployed();

  console.log(`Saint Quartz contract deployed to ${saintQuartz.address}`);

  writeAbi();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
