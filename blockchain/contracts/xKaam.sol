// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import { BaseHook } from "./BaseHook.sol";
import { Hooks } from "./libraries/Hooks.sol"; // <-- Update this as per your contracts struture
import {IPoolManager} from "./interfaces/IPoolManager.sol";

abstract contract xKaam is ERC20Capped, Ownable, BaseHook {
    constructor(uint256 cap, IPoolManager _poolManager) 
    ERC20("xKaamToken", "xKaam") 
    ERC20Capped(cap)
    BaseHook(_poolManager) 
{
   owner = msg.sender;
   ERC20._mint(owner, 70000000 * (10 ** decimals()));
}

    function mint(address to, uint256 amt) public onlyOwner {
        _mint(to, amt * 10**decimals());
    }

    function burn(address from, uint256 amt) public onlyOwner {
        _burn(from, amt * 10**decimals());
    }

}

