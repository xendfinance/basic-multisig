// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * @title DefaultToken
 */
contract Token is ERC20 {
    uint8 decimals_;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply
    ) ERC20(_name, _symbol) {
        decimals_ = _decimals;
        _mint(msg.sender, _totalSupply * (10**_decimals));
    }

    function decimals() public view override returns (uint8) {
        return decimals_;
    }
}
