pragma solidity ^0.5.1;
contract mortal {
    address payable owner;
    constructor() public { owner = msg.sender; }

    function kill() public { 
        if (msg.sender == owner) 
            selfdestruct(owner); 
    }
}

contract greeter is mortal {
     string greeting;
     constructor(string memory _greeting) public{
         greeting = _greeting;
     }
     function setGreeter(string memory _greeting) public {
        greeting = _greeting;
     }
    
     function greet() view public returns (string memory) {
        return greeting;
     }
}