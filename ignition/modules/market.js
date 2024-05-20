const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("seashore", (m) => {
  //const greeting = "Hello, world"; // Customize your initial greeting here

  // Deploy the Greeter contract with the initial greeting
  const nft = m.contract("seashore");
 
  return (nft);
}
)