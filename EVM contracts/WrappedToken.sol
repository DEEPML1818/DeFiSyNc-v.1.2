// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedToken is ERC20, Ownable {
    address public bridge;

    constructor() ERC20("Wrapped SOL", "wSOL") {
        bridge = msg.sender; // Assign the deployer as the bridge
    }

    modifier onlyBridge() {
        require(msg.sender == bridge, "Not authorized");
        _;
    }

    // Bridge can mint wrapped tokens
    function mint(address to, uint256 amount) external onlyBridge {
        _mint(to, amount);
    }

    // Bridge can burn wrapped tokens
    function burn(address from, uint256 amount) external onlyBridge {
        _burn(from, amount);
    }

    // Allow bridge to transfer ownership if needed
    function setBridge(address _bridge) external onlyOwner {
        bridge = _bridge;
    }
}
