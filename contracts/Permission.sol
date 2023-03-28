// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import "hardhat/console.sol";

contract Permission {
    uint256 storedPermission;

    function setPermission(uint256 permission) public {
        storedPermission = permission;
        console.log("called");
    }
}
