// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherForgeBazaar is SepoliaConfig {
    using FHE for *;
    
    struct GameItem {
        euint32 itemId;
        euint32 price;
        euint32 rarity;
        euint32 power;
        euint32 durability;
        bool isAvailable;
        bool isEncrypted;
        string name;
        string description;
        string imageUrl;
        address seller;
        uint256 timestamp;
    }
    
    struct Trade {
        euint32 tradeId;
        euint32 itemId;
        euint32 price;
        address buyer;
        address seller;
        bool isCompleted;
        uint256 timestamp;
    }
    
    struct PlayerProfile {
        euint32 playerId;
        euint32 reputation;
        euint32 totalTrades;
        euint32 successRate;
        bool isVerified;
        string username;
        address playerAddress;
    }
    
    mapping(uint256 => GameItem) public items;
    mapping(uint256 => Trade) public trades;
    mapping(address => PlayerProfile) public players;
    mapping(address => euint32) public playerBalances;
    
    uint256 public itemCounter;
    uint256 public tradeCounter;
    uint256 public playerCounter;
    
    address public owner;
    address public verifier;
    
    event ItemListed(uint256 indexed itemId, address indexed seller, string name);
    event TradeExecuted(uint256 indexed tradeId, uint256 indexed itemId, address indexed buyer, address indexed seller);
    event PlayerRegistered(address indexed player, string username);
    event ReputationUpdated(address indexed player, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function registerPlayer(string memory _username) public returns (uint256) {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(players[msg.sender].playerAddress == address(0), "Player already registered");
        
        uint256 playerId = playerCounter++;
        
        players[msg.sender] = PlayerProfile({
            playerId: FHE.asEuint32(0), // Will be set properly later
            reputation: FHE.asEuint32(100), // Starting reputation
            totalTrades: FHE.asEuint32(0),
            successRate: FHE.asEuint32(100), // Starting success rate
            isVerified: false,
            username: _username,
            playerAddress: msg.sender
        });
        
        emit PlayerRegistered(msg.sender, _username);
        return playerId;
    }
    
    function listItem(
        string memory _name,
        string memory _description,
        string memory _imageUrl,
        externalEuint32 _price,
        externalEuint32 _rarity,
        externalEuint32 _power,
        externalEuint32 _durability,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(players[msg.sender].playerAddress != address(0), "Player must be registered");
        require(bytes(_name).length > 0, "Item name cannot be empty");
        
        uint256 itemId = itemCounter++;
        
        // Convert external encrypted values to internal
        euint32 price = FHE.fromExternal(_price, inputProof);
        euint32 rarity = FHE.fromExternal(_rarity, inputProof);
        euint32 power = FHE.fromExternal(_power, inputProof);
        euint32 durability = FHE.fromExternal(_durability, inputProof);
        
        items[itemId] = GameItem({
            itemId: FHE.asEuint32(0), // Will be set properly later
            price: price,
            rarity: rarity,
            power: power,
            durability: durability,
            isAvailable: true,
            isEncrypted: true,
            name: _name,
            description: _description,
            imageUrl: _imageUrl,
            seller: msg.sender,
            timestamp: block.timestamp
        });
        
        emit ItemListed(itemId, msg.sender, _name);
        return itemId;
    }
    
    function purchaseItem(
        uint256 itemId,
        externalEuint32 paymentAmount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(items[itemId].seller != address(0), "Item does not exist");
        require(items[itemId].isAvailable, "Item is not available");
        require(items[itemId].seller != msg.sender, "Cannot buy your own item");
        require(players[msg.sender].playerAddress != address(0), "Buyer must be registered");
        
        uint256 tradeId = tradeCounter++;
        
        // Convert external encrypted payment to internal
        euint32 payment = FHE.fromExternal(paymentAmount, inputProof);
        
        trades[tradeId] = Trade({
            tradeId: FHE.asEuint32(0), // Will be set properly later
            itemId: FHE.asEuint32(itemId),
            price: payment,
            buyer: msg.sender,
            seller: items[itemId].seller,
            isCompleted: true,
            timestamp: block.timestamp
        });
        
        // Update item availability
        items[itemId].isAvailable = false;
        
        // Update player statistics
        players[msg.sender].totalTrades = FHE.add(players[msg.sender].totalTrades, FHE.asEuint32(1));
        players[items[itemId].seller].totalTrades = FHE.add(players[items[itemId].seller].totalTrades, FHE.asEuint32(1));
        
        emit TradeExecuted(tradeId, itemId, msg.sender, items[itemId].seller);
        return tradeId;
    }
    
    function verifyPlayer(address player, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify players");
        require(players[player].playerAddress != address(0), "Player does not exist");
        
        players[player].isVerified = isVerified;
    }
    
    function updateReputation(address player, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(players[player].playerAddress != address(0), "Player does not exist");
        
        players[player].reputation = reputation;
        emit ReputationUpdated(player, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getItemInfo(uint256 itemId) public view returns (
        string memory name,
        string memory description,
        string memory imageUrl,
        uint8 price,
        uint8 rarity,
        uint8 power,
        uint8 durability,
        bool isAvailable,
        bool isEncrypted,
        address seller,
        uint256 timestamp
    ) {
        GameItem storage item = items[itemId];
        return (
            item.name,
            item.description,
            item.imageUrl,
            0, // FHE.decrypt(item.price) - will be decrypted off-chain
            0, // FHE.decrypt(item.rarity) - will be decrypted off-chain
            0, // FHE.decrypt(item.power) - will be decrypted off-chain
            0, // FHE.decrypt(item.durability) - will be decrypted off-chain
            item.isAvailable,
            item.isEncrypted,
            item.seller,
            item.timestamp
        );
    }
    
    function getTradeInfo(uint256 tradeId) public view returns (
        uint8 itemId,
        uint8 price,
        address buyer,
        address seller,
        bool isCompleted,
        uint256 timestamp
    ) {
        Trade storage trade = trades[tradeId];
        return (
            0, // FHE.decrypt(trade.itemId) - will be decrypted off-chain
            0, // FHE.decrypt(trade.price) - will be decrypted off-chain
            trade.buyer,
            trade.seller,
            trade.isCompleted,
            trade.timestamp
        );
    }
    
    function getPlayerInfo(address player) public view returns (
        string memory username,
        uint8 reputation,
        uint8 totalTrades,
        uint8 successRate,
        bool isVerified
    ) {
        PlayerProfile storage playerProfile = players[player];
        return (
            playerProfile.username,
            0, // FHE.decrypt(playerProfile.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(playerProfile.totalTrades) - will be decrypted off-chain
            0, // FHE.decrypt(playerProfile.successRate) - will be decrypted off-chain
            playerProfile.isVerified
        );
    }
    
    function withdrawFunds() public {
        require(players[msg.sender].playerAddress != address(0), "Player must be registered");
        
        // In a real implementation, funds would be transferred based on decrypted balance
        // For now, this is a placeholder function
        // payable(msg.sender).transfer(amount);
    }
}
