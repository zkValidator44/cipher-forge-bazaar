import { GameItemCard } from "./GameItemCard";
import legendarySword from "@/assets/legendary-sword.jpg";
import dragonArmor from "@/assets/dragon-armor.jpg";
import crystalOrb from "@/assets/crystal-orb.jpg";
import enchantedBow from "@/assets/enchanted-bow.jpg";

const gameItems = [
  {
    id: "1",
    name: "Shadowbane Blade",
    image: legendarySword,
    rarity: "legendary" as const,
    price: 2500,
    encrypted: true,
    seller: "DragonSlayer92"
  },
  {
    id: "2", 
    name: "Dragon Scale Armor",
    image: dragonArmor,
    rarity: "epic" as const,
    price: 1800,
    encrypted: false,
    seller: "MysticForge"
  },
  {
    id: "3",
    name: "Orb of Infinite Wisdom",
    image: crystalOrb,
    rarity: "legendary" as const,
    price: 3200,
    encrypted: true,
    seller: "ArcaneDealer"
  },
  {
    id: "4",
    name: "Elvish Moonbow",
    image: enchantedBow,
    rarity: "rare" as const,
    price: 950,
    encrypted: false,
    seller: "ElvenMaster"
  }
];

interface FloatingStallProps {
  animationClass?: string;
}

export const FloatingStall = ({ animationClass = "float" }: FloatingStallProps) => {
  return (
    <div className={`${animationClass} relative`}>
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-mystical">
        {/* Stall header */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-secondary mb-2">Digital Bazaar Stall</h3>
          <div className="h-px bg-gradient-cyber mx-auto w-20" />
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gameItems.map((item) => (
            <GameItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-sparkle opacity-60" />
        <div className="absolute bottom-4 left-3 w-1 h-1 bg-secondary rounded-full animate-sparkle opacity-40" 
             style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-primary-glow rounded-full animate-sparkle opacity-50" 
             style={{ animationDelay: "2s" }} />
      </div>
    </div>
  );
};