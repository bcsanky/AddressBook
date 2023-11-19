// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contract {
    address public manager;

    struct UserData {
        string name;
        string email;
        string phone;
        string publicKey;
        address userAddress;
    }

    mapping(address => UserData) public users;
    address[] public userList;

    constructor() {
        manager = msg.sender;
    }

    function getUserCount() public view returns(uint userCount) {
        return userList.length;
    }

    function createUser(string memory _name, string memory _email, string memory _phone, string memory _publicKey) public returns (uint rowNumber) {
        address userAddress = address(uint160(bytes20(keccak256(abi.encodePacked(block.timestamp, msg.sender)))));
        users[userAddress] = UserData(_name, _email, _phone, _publicKey, userAddress);
        userList.push(userAddress);
        return userList.length - 1;
    }

    function updateUser(address userAddress, string memory _name, string memory _email, string memory _phone, string memory _publicKey) public returns(bool success) {
        require(userAddress != address(0), "Invalid address");
        users[userAddress] = UserData(_name, _email, _phone, _publicKey, userAddress);
        return true;
    }

    function deleteUser(address userAddress) public {
        require(userAddress != address(0), "Invalid address");
        delete users[userAddress];
        remove(indexOf(userAddress));
    }

    function indexOf(address searchFor) private view returns (uint256) {
        for (uint256 i = 0; i < userList.length; i++) {
            if (userList[i] == searchFor) {
                return i;
            }
        }
        revert("Not Found");
    }

    function remove(uint index) private {
        require(index < userList.length, "Index out of bounds");
        for (uint i = index; i < userList.length - 1; i++) {
            userList[i] = userList[i + 1];
        }
        userList.pop();
    }
}
