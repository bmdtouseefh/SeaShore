//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

//import "hardhat/console.sol";
//feature 1 usuers can list items
//feature 2 users can buy items
//feature 3 users can view dashboard of items available this is mostly frontend task
//feature 4 usuers can view their collection

contract seashore is ReentrancyGuard{
    uint marketItems;
   // uint fee = 5/10;

//create item model
    struct Item{
        uint nftId;
        IERC721 nft;
        address payable seller;
        bool sold;
        uint price;
        address payable owner;
    }
    mapping(uint=>Item) private idtoItem;
    constructor(){
    }
    //takes token id, retuurns market item


//listing items

//event is emitted on item listing
event itemListed(
    uint indexed nftId,
    IERC721 indexed nft,
    address seller,
    bool sold,
    uint price,
    address owner
);
//create alisting , to which one and at what price
function listItem(IERC721 _nft,uint _nftId, uint _price) public nonReentrant {
    //need a condiotion to list item
    marketItems++;
    require(_price>0,"price shuldbe more than zero");
    //call and assign id to market item here
    idtoItem[_nftId]=Item(
        _nftId,
        _nft,
        payable(msg.sender),
        false,
        _price,
        payable(address(this))
    );

    //transfer the nft from user to market contract
    _nft.transferFrom(payable(msg.sender), address(this), _nftId);

    //emit event to bl9ock chain
    emit itemListed(_nftId, _nft,msg.sender, false, _price, address(this));
}

//buy item
event buy(
    uint indexed nftId,
    IERC721 indexed nft,
    address seller,
    bool sold,
    uint price,
    address owner
);

//buy func.
//which one
function buyItem(uint _nftId) public payable {
    //get the nft details with is

    Item storage item = idtoItem[_nftId];


    //he should have enough to buy
    require(msg.value<item.price,"not enough balance");
    item.sold = true;
    //transfer nft
    item.nft.transferFrom(address(this), msg.sender, _nftId);
    //transfer amount to seller
    item.nft.transferFrom(msg.sender, item.seller, item.price);
 
    item.owner = payable(msg.sender);
    //emit buy
    emit buy(_nftId, item.nft, item.seller, item.sold, item.price, item.owner);
    }
}