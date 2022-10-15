import { ethers } from "hardhat";

async function main() {
  const totalSupply = ethers.utils.parseEther("100000000");

  // Compiled code
  const ERC20 = await ethers.getContractFactory("Nandy");

  // Deployment instance
  const erc20 = await ERC20.deploy(totalSupply);

  // Deployed instance
  const erc20Deployed = await erc20.deployed();

  console.log(erc20Deployed.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
