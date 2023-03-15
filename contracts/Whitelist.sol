// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Whitelist {
  address owner;
  mapping(address => bool) addresses;

  constructor() {
    owner = msg.sender;
  }

  function addUser(address _address) public onlyOwner {
    require(!isInWhitelist(_address), 'Address already in whitelist');
    addresses[_address] = true;
  }

  function removeUser(address _address) public onlyOwner {
    require(isInWhitelist(_address), 'Address not in whitelist');
    delete addresses[_address];
  }

  function isInWhitelist(address _address) public view returns(bool) {
    bool result = addresses[_address];
    return result;
  }

  modifier onlyOwner {
    require(msg.sender == owner, 'You are not the owner');
    _;
  }
  modifier isWhitelisted {
    require(isInWhitelist(msg.sender), 'Address not in whitelist');
    _;
  }

}
