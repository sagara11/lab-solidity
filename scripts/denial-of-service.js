// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const web3 = require("web3");
const ethers = hre.ethers;
const password = ethers.utils.formatBytes32String("password123");
const password_2 = ethers.utils.formatBytes32String("minhthong");
const money = ethers.utils.parseEther("2.0");

async function main() {
  // We get the contract to deploy

  const KingOfEther = await ethers.getContractFactory("KingOfEther");
  const kingOfEther = await KingOfEther.deploy();
  await kingOfEther.deployed();

  console.log("KingOfEther deployed to:", kingOfEther.address);

  const Attack_4 = await ethers.getContractFactory("Attack_4");
  const attack = await Attack_4.deploy(kingOfEther.address);
  await attack.deployed();

  await kingOfEther.claimThrone({ value: money });

  console.log("Attack_4 deployed to:", attack.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
