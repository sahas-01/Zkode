// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract xKaam is ERC20Capped {
    address public owner;

    constructor(uint256 cap) ERC20("xKaamToken", "xKaam") ERC20Capped(cap) {
        owner = msg.sender;
        ERC20._mint(owner, 70000000 * (10 ** decimals()));
    }

    function mint(address to, uint256 amt) public {
        _mint(to, amt * (10 ** decimals()));
    }

    function burn(address from, uint256 amt) public {
        _burn(from, amt * (10 ** decimals()));
    }

}