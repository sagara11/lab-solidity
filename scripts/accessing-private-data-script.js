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
  const Vault = await hre.ethers.getContractFactory("Vault");
  const vault = await Vault.deploy(password);

  await vault.deployed();

  console.log("Vault deployed to:", vault.address);

  const tx = await vault.addUser(password, 1);
  await tx.wait(1);
  const tx_2 = await vault.addUser(password_2, 2);
  await tx_2.wait(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
