// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract SaintQuartz is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    struct SaintQuartzPackage {
        // price as USD, denominated as Gwei
        uint price;
        uint amount;
    }

    SaintQuartzPackage[6] private _sqPackages;

    function initialize() external initializer {
        __ERC20_init("SaintQuartz", "SQ");
        __Ownable_init();

        // define Saint Quartz purchase packages
        _sqPackages[0] = SaintQuartzPackage(990000000, 1);
        _sqPackages[1] = SaintQuartzPackage(3990000000, 5);
        _sqPackages[2] = SaintQuartzPackage(11990000000, 19);
        _sqPackages[3] = SaintQuartzPackage(23990000000, 41);
        _sqPackages[4] = SaintQuartzPackage(39990000000, 77);
        _sqPackages[5] = SaintQuartzPackage(79990000000, 168);
    }

    // to change to payable 
    // payable value based on amount * current ether value pulled with price oracle
    function mint(address to, uint packageIndex) external onlyOwner {
        SaintQuartzPackage memory package = _sqPackages[packageIndex];
        _mint(to, package.amount);
    }

    function getSqPackages() external view returns (SaintQuartzPackage[6] memory) {
        return _sqPackages;
    }
}
