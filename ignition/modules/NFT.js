import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("NFT", (m) => {
  //const greeting = "Hello, world"; // Customize your initial greeting here

  // Deploy the Greeter contract with the initial greeting
  const nft = m.contract("NFT");
  m.call(nft, "mint", ["tokenUri"]);
  // Optionally, log the deployed contract address
  //   console.log("Greeter contract deployed to:", greeter.address);

  return { nft };
});
