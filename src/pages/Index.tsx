import { useState } from "react";
import { Logo } from "@/components/Logo";
import { WalletConnect } from "@/components/WalletConnect";
import { MainNavigation } from "@/components/MainNavigation";
import { BrowseMarket } from "@/components/sections/BrowseMarket";
import { LearnFHE } from "@/components/sections/LearnFHE";
import { TradingSection } from "@/components/sections/TradingSection";
import { ContractInteraction } from "@/components/ContractInteraction";
import { DigitalLanterns } from "@/components/DigitalLanterns";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Zap, Gem } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("browse");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "browse":
        return <BrowseMarket />;
      case "learn":
        return <LearnFHE />;
      case "trade":
        return <TradingSection />;
      case "contract":
        return <ContractInteraction />;
      default:
        return <BrowseMarket />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <div>
              <h1 className="text-xl font-bold text-secondary">CryptoForge</h1>
              <p className="text-xs text-muted-foreground">Encrypted Item Market</p>
            </div>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Navigation */}
      <MainNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="relative inline-block mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-mystical bg-clip-text text-transparent mb-4">
              Trade Rare Assets Privately with FHE
            </h1>
            <div className="absolute inset-0 bg-gradient-mystical blur-3xl opacity-20 -z-10" />
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Experience the future of gaming commerce where legendary items are protected by 
            Fully Homomorphic Encryption until the moment of settlement. No more sniping, 
            no more manipulation - just pure, private trading.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={() => setActiveSection("browse")}
              className="bg-gradient-mystical text-primary-foreground hover:shadow-mystical transition-mystical"
            >
              <Eye className="mr-2 h-4 w-4" />
              Browse Market
            </Button>
            <Button 
              onClick={() => setActiveSection("learn")}
              variant="outline" 
              className="border-accent text-accent hover:bg-accent/10"
            >
              <Shield className="mr-2 h-4 w-4" />
              Learn About FHE
            </Button>
            <Button 
              onClick={() => setActiveSection("trade")}
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <Zap className="mr-2 h-4 w-4" />
              Start Trading
            </Button>
            <Button 
              onClick={() => setActiveSection("contract")}
              variant="outline" 
              className="border-gold text-gold hover:bg-gold/10"
            >
              <Gem className="mr-2 h-4 w-4" />
              Contract Interaction
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4 glow-primary" />
              <h3 className="text-lg font-semibold mb-2">Encrypted Trades</h3>
              <p className="text-muted-foreground">All item details hidden until settlement</p>
            </div>
            
            <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
              <Zap className="h-12 w-12 text-accent mx-auto mb-4 glow-accent" />
              <h3 className="text-lg font-semibold mb-2">Anti-Sniping</h3>
              <p className="text-muted-foreground">Fair trading without front-running</p>
            </div>
            
            <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
              <Eye className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Preview System</h3>
              <p className="text-muted-foreground">Secure previews without revealing full details</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      {renderActiveSection()}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <DigitalLanterns />
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Logo size="sm" />
              <span className="text-lg font-bold text-secondary">CryptoForge</span>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Powered by Fully Homomorphic Encryption • Securing the future of gaming commerce
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-accent transition-mystical">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-mystical">Terms of Service</a>
              <a href="#" className="hover:text-accent transition-mystical">Documentation</a>
              <a href="#" className="hover:text-accent transition-mystical">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;