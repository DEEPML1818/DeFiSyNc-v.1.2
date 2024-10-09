// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MantaReceiver {
    event DataReceived(string data);

    function receiveData(string memory data) public {
        // Handle the received data (store it, process it, etc.)
        emit DataReceived(data);
    }
}
