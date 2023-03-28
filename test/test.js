const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Delegatecall', function () {
  let owner, attacker, secureStore, permission, whaleSigner;

  const WHALE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const AMOUNT_TO_SEND = ethers.utils.parseEther("1000");

  before(async () => {
    [owner, attacker] = await ethers.getSigners();

    const Permission = await ethers.getContractFactory('Permission');
    permission = await Permission.connect(owner).deploy();

    const SecureStore = await ethers.getContractFactory('SecureStore');
    secureStore = await SecureStore.connect(owner).deploy(permission.address,permission.address);

    whaleSigner = await ethers.getImpersonatedSigner(WHALE);

    await whaleSigner.sendTransaction({
        to: secureStore.address,
        value: AMOUNT_TO_SEND
      });
  });

  it('Exploit', async () => {
    const AttackerContract = await ethers.getContractFactory('Attacker');
    const attackerContract = await AttackerContract.connect(attacker).deploy();

    console.log("Owner before attack: ", await secureStore.owner());
    attackerContract.connect(attacker).attack(secureStore);
   

  });

  after(async () => {
    console.log("Owner after attack: ", await secureStore.owner());

  });
});