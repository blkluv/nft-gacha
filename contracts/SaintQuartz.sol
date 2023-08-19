// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract SaintQuartz is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, PausableUpgradeable, ReentrancyGuardUpgradeable, OwnableUpgradeable, EIP712Upgradeable, UUPSUpgradeable {
    struct SaintQuartzPackage {
        // price as USD, denominated as Gwei
        uint256 price;
        uint256 amount;
    }

    struct SQSigner {
        uint256 packageIndex;
        address user;
        bytes signature;
    }

    SaintQuartzPackage[6] private _sqPackages;

    function initialize() external initializer {
        __ERC20_init("SaintQuartz", "SQ");
        __EIP712_init("SQDomain", "1");
        __ERC20Burnable_init();
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();

        // define Saint Quartz purchase packages
        _sqPackages[0] = SaintQuartzPackage(990000000, 1);
        _sqPackages[1] = SaintQuartzPackage(3990000000, 5);
        _sqPackages[2] = SaintQuartzPackage(11990000000, 19);
        _sqPackages[3] = SaintQuartzPackage(23990000000, 41);
        _sqPackages[4] = SaintQuartzPackage(39990000000, 77);
        _sqPackages[5] = SaintQuartzPackage(79990000000, 168);
    }

    function getSqPackages() external view returns (SaintQuartzPackage[6] memory) {
        return _sqPackages;
    }

    function verifySigner(SQSigner calldata sqSigner) public view returns (address signer) {
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
            keccak256("SQSigner(address user,uint256 packageIndex)"),
            sqSigner.user,
            sqSigner.packageIndex
        )));

        signer = ECDSA.recover(digest, sqSigner.signature);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // payable value based on amount * current ether value pulled with price oracle
    function mint(SQSigner calldata sqSigner) public payable nonReentrant whenNotPaused() {
        require(msg.sender == verifySigner(sqSigner), "Invalid signature!");
        require(msg.value > 0, "Invalid amount!");
        require(sqSigner.packageIndex < _sqPackages.length, "Invalid package!");
        
        SaintQuartzPackage memory package = _sqPackages[sqSigner.packageIndex];
        require(msg.value >= package.price, "Invalid amount!");

        _mint(sqSigner.user, package.amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}
