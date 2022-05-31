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
const money = ethers.utils.parseEther("0.00001");
const gasLimit = ethers.utils.parseEther("1.0");

async function main() {
const [signer, client_1, client_2] = await ethers.getSigners();
  // We get the contract to deploy

  const FindThisHash = await ethers.getContractFactory(
    "FindThisHash"
  );
  const findThisHash = await FindThisHash.deploy({
    value: money,
  });
  await findThisHash.deployed();

  console.log(
    "FindThisHash deployed to:",
    findThisHash.address
  );

//   await findThisHash.connect(client_1).solve("Ethereum", {gasPrice: 1500000000, gasLimit: gasLimit})
//   await findThisHash.connect(client_2).solve("Ethereum", {gasPrice: 10000000000, gasLimit: gasLimit})
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
