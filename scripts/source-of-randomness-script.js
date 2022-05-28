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

  const GuessTheRandomNumber = await ethers.getContractFactory(
    "GuessTheRandomNumber"
  );
  const guessTheRandomNumber = await GuessTheRandomNumber.deploy({
    value: money,
  });
  await guessTheRandomNumber.deployed();

  console.log(
    "GuessTheRandomNumber deployed to:",
    guessTheRandomNumber.address
  );

  const Attack_3 = await ethers.getContractFactory("Attack_3");
  const attack = await Attack_3.deploy(guessTheRandomNumber.address);
  await attack.deployed();

  console.log("Attack_3 deployed to:", attack.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
