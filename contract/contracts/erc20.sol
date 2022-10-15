// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nandy is ERC20, Ownable {
    constructor(uint256 totalSupply) ERC20("Nandy", "NAN") {
        _mint(_msgSender(), totalSupply);
    }
}
