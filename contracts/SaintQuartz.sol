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
    SaintQuartzPackage[6] private _sqPackages;

    event Mint(address indexed _to, uint256 _value);
    event Burn(address indexed _from, uint256 _value);

    struct SaintQuartzPackage {
        // price as USD(ether), denominated as Gwei
        uint256 price;
        uint256 amount;
    }

    struct SQSigner {
        uint256 packageIndex;
        address user;
        bytes signature;
    }


    function initialize() external initializer {
        __ERC20_init("SaintQuartz", "SQ");
        __EIP712_init("SQDomain", "1");
        __ERC20Burnable_init();
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();

        // define Saint Quartz purchase packages
        _sqPackages[0] = SaintQuartzPackage(10000000000, 1);
        _sqPackages[1] = SaintQuartzPackage(40000000000, 5);
        _sqPackages[2] = SaintQuartzPackage(120000000000, 19);
        _sqPackages[3] = SaintQuartzPackage(240000000000, 41);
        _sqPackages[4] = SaintQuartzPackage(400000000000, 77);
        _sqPackages[5] = SaintQuartzPackage(800000000000, 168);
    }

    function getSqPackages() external view returns (SaintQuartzPackage[6] memory) {
        return _sqPackages;
    }

    function buySaintQuartz(SQSigner calldata sqSigner) external payable nonReentrant whenNotPaused() {
        require(msg.sender == verifySigner(sqSigner), "Invalid signature!");
        require(msg.value > 0, "Invalid amount!");
        require(sqSigner.packageIndex < _sqPackages.length, "Invalid package!");

        // Calculate USD equivalent in ether
        SaintQuartzPackage memory package = _sqPackages[sqSigner.packageIndex];
        uint256 ethUnitPrice = uint256(getLatestPrice());
        uint256 packagePriceInEther = (1 ether / ethUnitPrice) * (package.price / 1e10);
        require(msg.value >= packagePriceInEther, "Invalid amount!");

        _mint(sqSigner.user, package.amount);

        emit Mint(msg.sender, package.amount);
    }

    function useSaintQuartz(address from, uint sqAmount) external nonReentrant whenNotPaused() {
        require(sqAmount > 0, "Invalid amount!");
        
        _approve(from, _msgSender(), sqAmount);
        burnFrom(from, sqAmount);

        emit Burn(from, sqAmount);
    }

    function verifySigner(SQSigner calldata sqSigner) public view returns (address signer) {
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
            keccak256("SQSigner(address user,uint256 packageIndex)"),
            sqSigner.user,
            sqSigner.packageIndex
        )));

        signer = ECDSA.recover(digest, sqSigner.signature);
    }

    // to be pull from chainlink oracle price feed
    function getLatestPrice() public pure returns (int256) {
        int256 mockedPriceUsd = 1500;
        return mockedPriceUsd;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
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
    