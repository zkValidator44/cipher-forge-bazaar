import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Key, Eye, Zap, ArrowRight, CheckCircle } from "lucide-react";

export const LearnFHE = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* FHE Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Fully Homomorphic Encryption
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The revolutionary technology that enables secure computation on encrypted data, 
            protecting your trades from sniping and manipulation.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-primary mb-6">How FHE Protects Your Trades</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-mystical rounded-full flex items-center justify-center">
                  <Lock className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Encrypted Listing</h4>
                  <p className="text-muted-foreground">
                    Item details are encrypted before being posted to the market. 
                    No one can see what you're selling until the trade completes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-cyber rounded-full flex items-center justify-center">
                  <Eye className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Secure Preview</h4>
                  <p className="text-muted-foreground">
                    Our preview system allows buyers to verify items without revealing 
                    complete details, preventing front-running attacks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Instant Settlement</h4>
                  <p className="text-muted-foreground">
                    When a trade is confirmed, encryption is lifted and the item 
                    is instantly transferred to the buyer's wallet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card/50 border border-border/50 rounded-xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-accent mb-4">Why FHE Matters</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Prevents market manipulation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Eliminates sniping attacks</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Ensures fair pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Protects seller identity</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-mystical/10 border border-primary/20 rounded-xl p-8 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-primary mb-4">Technical Advantages</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Zero-knowledge proof validation</li>
                <li>• Homomorphic computation on encrypted data</li>
                <li>• Cryptographic commitment schemes</li>
                <li>• MEV (Maximum Extractable Value) protection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FHE Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 bg-card/30 rounded-xl backdrop-blur-sm border border-border/50">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4 glow-primary" />
            <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
            <p className="text-muted-foreground">
              Your trading strategies and inventory remain completely private until you choose to reveal them.
            </p>
          </div>
          
          <div className="text-center p-8 bg-card/30 rounded-xl backdrop-blur-sm border border-border/50">
            <Key className="h-16 w-16 text-accent mx-auto mb-4 glow-accent" />
            <h3 className="text-xl font-semibold mb-3">True Ownership</h3>
            <p className="text-muted-foreground">
              Cryptographic proofs ensure you maintain full control of your assets throughout the trading process.
            </p>
          </div>
          
          <div className="text-center p-8 bg-card/30 rounded-xl backdrop-blur-sm border border-border/50">
            <Zap className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Instant Execution</h3>
            <p className="text-muted-foreground">
              Advanced encryption allows for immediate trade settlement without compromising security.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button className="bg-gradient-mystical text-primary-foreground hover:shadow-mystical transition-mystical text-lg px-8 py-3">
            Start Trading Securely
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};