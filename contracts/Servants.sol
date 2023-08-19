// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./SaintQuartz.sol";
import "hardhat/console.sol";

contract Servants is Initializable, ERC1155Upgradeable, OwnableUpgradeable {
    SaintQuartz public saintQuartz;
    uint256 public singleRollCost = 3;
    uint256 public mulitRollCost = 30;

    function initialize(address saintQuartzAdd) external initializer {
        __Ownable_init();

        saintQuartz = SaintQuartz(saintQuartzAdd);
    }

    function rollServants() external {
        saintQuartz.useSaintQuartz(msg.sender, mulitRollCost);
    }
}
