import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Shield, Zap, TrendingUp, BookOpen, Coins, Gem } from "lucide-react";

interface MainNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const MainNavigation = ({ activeSection, onSectionChange }: MainNavigationProps) => {
  const navItems = [
    {
      id: "browse",
      label: "Browse Market",
      icon: Eye,
      description: "Explore rare items",
      color: "text-primary"
    },
    {
      id: "learn", 
      label: "Learn About FHE",
      icon: Shield,
      description: "Understand encryption",
      color: "text-accent"
    },
    {
      id: "trade",
      label: "Trade",
      icon: TrendingUp,
      description: "Start trading",
      color: "text-secondary"
    },
    {
      id: "contract",
      label: "Contract Interaction",
      icon: Gem,
      description: "Interact with smart contract",
      color: "text-gold"
    }
  ];

  return (
    <nav className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                variant={isActive ? "default" : "outline"}
                className={`
                  relative flex flex-col sm:flex-row items-center gap-2 h-auto py-3 px-6
                  ${isActive 
                    ? "bg-gradient-mystical text-primary-foreground hover:shadow-mystical" 
                    : "border-border/50 hover:border-border hover:bg-card/50"
                  }
                  transition-mystical group
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary-foreground" : item.color}`} />
                <div className="text-center sm:text-left">
                  <div className="font-semibold">{item.label}</div>
                  <div className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-mystical blur-xl opacity-20 -z-10" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};