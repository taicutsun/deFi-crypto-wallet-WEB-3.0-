// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
//import "hardhat/console.sol";

//npx hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost

contract Lock {
    address payable public owner;

    event Withdrawal(uint amount, uint when);
    event EtherForwarded(address indexed from, address indexed to, uint amount);


    constructor() payable {
        owner = payable(msg.sender);
    }
    
    // Function to forward Ether sent to this contract to another address
    function forwardEther(address payable _to) external payable {
        require(msg.sender != _to, "Cant transfer ether to yourself");
        require(msg.value > 0, "No Ether sent");
        
        bool success = _to.send(msg.value);
        require(success, "Transfer failed");

        emit EtherForwarded(msg.sender, _to, msg.value);
    }

    function withdraw() public {
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
