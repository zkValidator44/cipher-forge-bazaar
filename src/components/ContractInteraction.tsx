import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Gem, Sword, Shield, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Contract ABI for CipherForgeBazaar
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_username", "type": "string"}
    ],
    "name": "registerPlayer",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_imageUrl", "type": "string"},
      {"internalType": "uint32", "name": "_price", "type": "uint32"},
      {"internalType": "uint32", "name": "_rarity", "type": "uint32"},
      {"internalType": "uint32", "name": "_power", "type": "uint32"},
      {"internalType": "uint32", "name": "_durability", "type": "uint32"}
    ],
    "name": "listItem",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "itemId", "type": "uint256"},
      {"internalType": "uint32", "name": "paymentAmount", "type": "uint32"}
    ],
    "name": "purchaseItem",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual contract address

export const ContractInteraction = () => {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  
  // Player registration state
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Item listing state
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemRarity, setItemRarity] = useState('');
  const [itemPower, setItemPower] = useState('');
  const [itemDurability, setItemDurability] = useState('');
  const [isListing, setIsListing] = useState(false);
  
  // Purchase state
  const [purchaseItemId, setPurchaseItemId] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Contract write functions
  const { writeContract: writeRegisterPlayer, data: registerHash } = useWriteContract();
  const { writeContract: writeListItem, data: listHash } = useWriteContract();
  const { writeContract: writePurchaseItem, data: purchaseHash } = useWriteContract();

  // Transaction receipts
  const { isLoading: isRegisterConfirming } = useWaitForTransactionReceipt({
    hash: registerHash,
  });

  const { isLoading: isListConfirming } = useWaitForTransactionReceipt({
    hash: listHash,
  });

  const { isLoading: isPurchaseConfirming } = useWaitForTransactionReceipt({
    hash: purchaseHash,
  });

  const handleRegisterPlayer = async () => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    setIsRegistering(true);
    try {
      await writeRegisterPlayer({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerPlayer',
        args: [username],
      });
      
      toast({
        title: "Player Registration",
        description: "Registration transaction submitted!",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to register player",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleListItem = async () => {
    if (!itemName.trim() || !itemDescription.trim() || !itemPrice) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsListing(true);
    try {
      await writeListItem({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'listItem',
        args: [
          itemName,
          itemDescription,
          itemImageUrl,
          parseInt(itemPrice),
          parseInt(itemRarity) || 1,
          parseInt(itemPower) || 1,
          parseInt(itemDurability) || 1,
        ],
      });
      
      toast({
        title: "Item Listed",
        description: "Item listing transaction submitted!",
      });
    } catch (error) {
      toast({
        title: "Listing Failed",
        description: "Failed to list item",
        variant: "destructive",
      });
    } finally {
      setIsListing(false);
    }
  };

  const handlePurchaseItem = async () => {
    if (!purchaseItemId || !purchaseAmount) {
      toast({
        title: "Error",
        description: "Please enter item ID and amount",
        variant: "destructive",
      });
      return;
    }

    setIsPurchasing(true);
    try {
      await writePurchaseItem({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'purchaseItem',
        args: [parseInt(purchaseItemId), parseInt(purchaseAmount)],
        value: BigInt(parseInt(purchaseAmount)),
      });
      
      toast({
        title: "Purchase Initiated",
        description: "Purchase transaction submitted!",
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Failed to purchase item",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="bg-gradient-mystical border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Gem className="h-5 w-5" />
            Contract Interaction
          </CardTitle>
          <CardDescription>
            Connect your wallet to interact with the Cipher Forge Bazaar contract
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Player Registration */}
      <Card className="bg-gradient-mystical border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sword className="h-5 w-5" />
            Register as Player
          </CardTitle>
          <CardDescription>
            Join the mystical marketplace and start your trading journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your mystical username"
              className="bg-background/50"
            />
          </div>
          <Button
            onClick={handleRegisterPlayer}
            disabled={isRegistering || isRegisterConfirming}
            className="w-full bg-gradient-gold hover:shadow-gold"
          >
            {isRegistering || isRegisterConfirming ? "Registering..." : "Register Player"}
          </Button>
        </CardContent>
      </Card>

      {/* List Item */}
      <Card className="bg-gradient-mystical border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Shield className="h-5 w-5" />
            List Magical Item
          </CardTitle>
          <CardDescription>
            List your enchanted items for trade with encrypted data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Legendary Sword of Fire"
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="itemPrice">Price (Wei)</Label>
              <Input
                id="itemPrice"
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="1000000000000000000"
                className="bg-background/50"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="itemDescription">Description</Label>
            <Textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="A mystical weapon forged in the fires of Mount Doom..."
              className="bg-background/50"
            />
          </div>
          
          <div>
            <Label htmlFor="itemImageUrl">Image URL</Label>
            <Input
              id="itemImageUrl"
              value={itemImageUrl}
              onChange={(e) => setItemImageUrl(e.target.value)}
              placeholder="https://example.com/item-image.jpg"
              className="bg-background/50"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="itemRarity">Rarity (1-10)</Label>
              <Input
                id="itemRarity"
                type="number"
                min="1"
                max="10"
                value={itemRarity}
                onChange={(e) => setItemRarity(e.target.value)}
                placeholder="8"
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="itemPower">Power</Label>
              <Input
                id="itemPower"
                type="number"
                value={itemPower}
                onChange={(e) => setItemPower(e.target.value)}
                placeholder="95"
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="itemDurability">Durability</Label>
              <Input
                id="itemDurability"
                type="number"
                value={itemDurability}
                onChange={(e) => setItemDurability(e.target.value)}
                placeholder="100"
                className="bg-background/50"
              />
            </div>
          </div>
          
          <Button
            onClick={handleListItem}
            disabled={isListing || isListConfirming}
            className="w-full bg-gradient-gold hover:shadow-gold"
          >
            {isListing || isListConfirming ? "Listing Item..." : "List Item"}
          </Button>
        </CardContent>
      </Card>

      {/* Purchase Item */}
      <Card className="bg-gradient-mystical border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Zap className="h-5 w-5" />
            Purchase Item
          </CardTitle>
          <CardDescription>
            Acquire legendary items from other players
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="purchaseItemId">Item ID</Label>
              <Input
                id="purchaseItemId"
                type="number"
                value={purchaseItemId}
                onChange={(e) => setPurchaseItemId(e.target.value)}
                placeholder="1"
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="purchaseAmount">Amount (Wei)</Label>
              <Input
                id="purchaseAmount"
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                placeholder="1000000000000000000"
                className="bg-background/50"
              />
            </div>
          </div>
          
          <Button
            onClick={handlePurchaseItem}
            disabled={isPurchasing || isPurchaseConfirming}
            className="w-full bg-gradient-gold hover:shadow-gold"
          >
            {isPurchasing || isPurchaseConfirming ? "Purchasing..." : "Purchase Item"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
