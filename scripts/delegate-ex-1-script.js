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

async function main() {
  // We get the contract to deploy

  const Lib_1 = await ethers.getContractFactory("Lib_1");
  const lib = await Lib_1.deploy();
  await lib.deployed();

  console.log("Lib deployed to:", lib.address);

  const HackMe_1 = await ethers.getContractFactory("HackMe_1");
  const hackMe = await HackMe_1.deploy(lib.address);
  await hackMe.deployed();

  console.log("HackMe deployed to:", hackMe.address);

  const Attack_1 = await ethers.getContractFactory("Attack_1");
  const attack = await Attack_1.deploy(hackMe.address);
  await attack.deployed();

  console.log("Attack deployed to:", attack.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
