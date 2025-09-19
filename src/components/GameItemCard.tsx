import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, Coins, Star } from "lucide-react";

interface GameItem {
  id: string;
  name: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  price: number;
  encrypted: boolean;
  seller: string;
}

interface GameItemCardProps {
  item: GameItem;
}

const rarityColors = {
  common: "bg-muted text-muted-foreground",
  rare: "bg-gradient-cyber text-accent-foreground",
  epic: "bg-gradient-mystical text-primary-foreground", 
  legendary: "bg-gradient-gold text-secondary-foreground"
};

const rarityIcons = {
  common: 1,
  rare: 2,
  epic: 3,
  legendary: 5
};

export const GameItemCard = ({ item }: GameItemCardProps) => {
  const [isRevealed, setIsRevealed] = useState(!item.encrypted);

  const handleReveal = () => {
    if (item.encrypted) {
      setIsRevealed(true);
    }
  };

  return (
    <div className="relative bg-gradient-stall border border-border rounded-lg p-4 hover:shadow-mystical transition-mystical group">
      {/* Encrypted overlay */}
      {item.encrypted && !isRevealed && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10 encrypted-overlay">
          <div className="text-center">
            <Lock className="h-8 w-8 text-accent mx-auto mb-2 glow-accent" />
            <p className="text-sm text-muted-foreground">Encrypted Until Settlement</p>
            <Button
              onClick={handleReveal}
              size="sm"
              variant="outline"
              className="mt-2 border-accent text-accent hover:bg-accent/10"
            >
              <Eye className="mr-1 h-3 w-3" />
              Preview
            </Button>
          </div>
        </div>
      )}

      {/* Item image */}
      <div className="aspect-square mb-3 overflow-hidden rounded-md bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-mystical group-hover:scale-105"
        />
      </div>

      {/* Item details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm truncate">{item.name}</h3>
          <Badge className={`text-xs ${rarityColors[item.rarity]}`}>
            <div className="flex items-center gap-1">
              {[...Array(rarityIcons[item.rarity])].map((_, i) => (
                <Star key={i} className="h-2 w-2 fill-current" />
              ))}
            </div>
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Seller: {item.seller}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-secondary">
            <Coins className="h-4 w-4" />
            <span className="font-bold">{item.price}</span>
          </div>
          
          <Button 
            size="sm" 
            className="bg-gradient-mystical text-primary-foreground hover:shadow-mystical transition-mystical"
          >
            Trade
          </Button>
        </div>
      </div>

      {/* Floating animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sparkle" />
      </div>
    </div>
  );
};