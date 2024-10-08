// ScrollDataStore.sol
pragma solidity ^0.8.0;

contract ScrollDataStore {
    string public data;

    function storeData(string memory _data) public {
        data = _data;
    }

    function getData() public view returns (string memory) {
        return data;
    }
}
