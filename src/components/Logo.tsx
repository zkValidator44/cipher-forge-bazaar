import { Gem, Sparkles, Zap } from "lucide-react";

export const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      {/* Magical crystal orb */}
      <div className="relative">
        <Gem 
          size={iconSizes[size]} 
          className="text-primary glow-primary animate-pulse" 
        />
        
        {/* Magical sparkles around the crystal */}
        <Sparkles 
          size={iconSizes[size] * 0.3} 
          className="absolute -top-1 -right-1 text-gold animate-bounce" 
        />
        <Zap 
          size={iconSizes[size] * 0.25} 
          className="absolute -bottom-1 -left-1 text-accent animate-pulse" 
        />
      </div>
      
      {/* Mystical energy rings */}
      <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin" 
           style={{ animationDuration: '3s' }} />
      <div className="absolute inset-1 border border-gold/20 rounded-full animate-spin" 
           style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
    </div>
  );
};