// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import "hardhat/console.sol";

contract SecureStore {
    address public electroHub;
    address public agroCenter;
    address public owner;
    uint256 storedPermission;

    bytes4 constant setPermissionSignature = bytes4(keccak256("setPermission(uint256)"));

    constructor(address _electroHubAddress, address _agroCenter) {
        electroHub = _electroHubAddress;
        agroCenter = _agroCenter;
        owner = msg.sender;
    }

     modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can withdraw!");
        _;
    }

     event PermissionSet(string message, uint256 permissionId);

    function setElectroHubPermission(uint256 _permissionId) public {
        electroHub.delegatecall(abi.encodePacked(setPermissionSignature, _permissionId));
        emit PermissionSet("Permission for ElectroHub set with ID ", _permissionId);
    }

    function setAgroCenterPermission(uint256 _permissionId) public {
        agroCenter.delegatecall(abi.encodePacked(setPermissionSignature, _permissionId));
        emit PermissionSet("Permission for AgroCenter set with ID ", _permissionId);
    }

    receive() external payable {}

    function withdraw(uint256 _amount) public onlyOwner {
        payable(msg.sender).transfer(_amount);
    }
}

