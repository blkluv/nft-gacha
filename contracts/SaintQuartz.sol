// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract SaintQuartz is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    function initialize() external initializer {
        __ERC20_init("SaintQuartz", "SQ");
        __Ownable_init();
    }

    // to change to payable 
    // payable value based on amount * current ether value pulled with price oracle
    function mint(address to, uint amount) external onlyOwner {
        _mint(to, amount);
    }
}
