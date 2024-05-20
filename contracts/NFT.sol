//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

//import erc721
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721URIStorage{
    uint tokenIds;
    address contractAddress;

    constructor(address marketplace_address) ERC721("NFTName", "SYM"){
        contractAddress = marketplace_address;
    }
    function mint(string memory tokenURI) public returns(uint){

        tokenIds++;
        _mint(msg.sender, tokenIds);
        _setTokenURI(tokenIds, tokenURI);
        setApprovalForAll(contractAddress, true);
        return tokenIds;
    }
}

