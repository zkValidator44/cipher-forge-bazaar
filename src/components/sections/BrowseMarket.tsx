import { FloatingStall } from "@/components/FloatingStall";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc } from "lucide-react";

export const BrowseMarket = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        {/* Market Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Digital Bazaar Market
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover legendary weapons, mystical armor, and rare artifacts. 
            All trades are secured with Fully Homomorphic Encryption until settlement.
          </p>
          
          {/* Market Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="border-border/50">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-border/50">
              <SortAsc className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>

          {/* Rarity Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-muted text-muted-foreground cursor-pointer hover:bg-muted/80">Common</Badge>
            <Badge className="bg-gradient-cyber text-accent-foreground cursor-pointer hover:opacity-80">Rare</Badge>
            <Badge className="bg-gradient-mystical text-primary-foreground cursor-pointer hover:opacity-80">Epic</Badge>
            <Badge className="bg-gradient-gold text-secondary-foreground cursor-pointer hover:opacity-80">Legendary</Badge>
          </div>
        </div>

        {/* Market Stalls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <FloatingStall animationClass="float" />
          <FloatingStall animationClass="float-delayed" />
          <FloatingStall animationClass="float-delayed-2" />
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
            <div className="text-2xl font-bold text-secondary mb-2">2,847</div>
            <div className="text-muted-foreground">Active Listings</div>
          </div>
          <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
            <div className="text-2xl font-bold text-primary mb-2">156</div>
            <div className="text-muted-foreground">Encrypted Trades</div>
          </div>
          <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
            <div className="text-2xl font-bold text-accent mb-2">98.2%</div>
            <div className="text-muted-foreground">Settlement Success</div>
          </div>
        </div>

        {/* Background particles */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-accent rounded-full animate-sparkle opacity-30" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-primary-glow rounded-full animate-sparkle opacity-40" 
             style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-secondary rounded-full animate-sparkle opacity-50" 
             style={{ animationDelay: "3s" }} />
      </div>
    </section>
  );
};