import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Coins, Clock, Shield, Zap } from "lucide-react";

export const TradingSection = () => {
  const [activeOrders] = useState([
    {
      id: "1",
      type: "buy",
      item: "Shadowbane Blade",
      price: 2500,
      status: "encrypted",
      timeLeft: "2h 34m"
    },
    {
      id: "2", 
      type: "sell",
      item: "Dragon Scale Armor",
      price: 1800,
      status: "active",
      timeLeft: "5h 12m"
    }
  ]);

  const [recentTrades] = useState([
    {
      id: "1",
      item: "Elvish Moonbow",
      price: 950,
      type: "buy",
      time: "2 min ago",
      status: "completed"
    },
    {
      id: "2",
      item: "Crystal Orb",
      price: 3200,
      type: "sell",
      time: "15 min ago",
      status: "completed"
    }
  ]);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Trading Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Advanced Trading Interface
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Execute secure trades with full encryption protection. Monitor your portfolio, 
            manage orders, and track market movements in real-time.
          </p>
        </div>

        {/* Trading Dashboard */}
        <Tabs defaultValue="orders" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="orders">Active Orders</TabsTrigger>
            <TabsTrigger value="history">Trade History</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Orders */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Active Orders
                  </CardTitle>
                  <CardDescription>Monitor your current trading positions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${order.type === 'buy' ? 'bg-primary' : 'bg-secondary'}`} />
                        <div>
                          <div className="font-semibold">{order.item}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Coins className="h-3 w-3" />
                            {order.price} coins
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === 'encrypted' ? 'default' : 'secondary'} className="mb-1">
                          {order.status === 'encrypted' ? (
                            <><Shield className="h-3 w-3 mr-1" />Encrypted</>
                          ) : (
                            'Active'
                          )}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{order.timeLeft}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Trade */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    Quick Trade
                  </CardTitle>
                  <CardDescription>Execute encrypted trades instantly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-gradient-mystical text-primary-foreground hover:shadow-mystical transition-mystical">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Buy Order
                    </Button>
                    <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                      <TrendingDown className="mr-2 h-4 w-4" />
                      Sell Order
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                    <div className="text-sm text-muted-foreground mb-2">Encryption Protection</div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary glow-primary" />
                      <span className="text-sm">All trades protected by FHE</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Your completed trading history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${trade.type === 'buy' ? 'bg-primary' : 'bg-secondary'}`} />
                        <div>
                          <div className="font-semibold">{trade.item}</div>
                          <div className="text-sm text-muted-foreground">{trade.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold flex items-center gap-1">
                          <Coins className="h-4 w-4" />
                          {trade.price}
                        </div>
                        <Badge variant="secondary" className="text-xs">Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-2">12,450</div>
                    <div className="text-muted-foreground">Total Value</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">23</div>
                    <div className="text-muted-foreground">Items Owned</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-2">8</div>
                    <div className="text-muted-foreground">Active Trades</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Trading Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
            <Shield className="h-10 w-10 text-primary mx-auto mb-3 glow-primary" />
            <div className="font-semibold mb-2">FHE Protected</div>
            <div className="text-sm text-muted-foreground">All trades encrypted</div>
          </div>
          
          <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
            <Zap className="h-10 w-10 text-accent mx-auto mb-3 glow-accent" />
            <div className="font-semibold mb-2">Instant Settlement</div>
            <div className="text-sm text-muted-foreground">Zero-delay execution</div>
          </div>
          
          <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
            <TrendingUp className="h-10 w-10 text-secondary mx-auto mb-3" />
            <div className="font-semibold mb-2">Market Analytics</div>
            <div className="text-sm text-muted-foreground">Real-time insights</div>
          </div>
          
          <div className="text-center p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-border/50">
            <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
            <div className="font-semibold mb-2">Order Management</div>
            <div className="text-sm text-muted-foreground">Advanced controls</div>
          </div>
        </div>
      </div>
    </section>
  );
};