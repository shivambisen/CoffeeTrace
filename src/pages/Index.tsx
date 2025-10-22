import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Leaf, Shield, QrCode } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Coffee,
      title: "Track Every Bean",
      description: "From harvest to your cup, trace the complete journey of your coffee",
    },
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      description: "Support ethical farming practices and transparent supply chains",
    },
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Immutable records stored on-chain with IPFS metadata",
    },
    {
      icon: QrCode,
      title: "QR Code Traceability",
      description: "Scan and verify coffee authenticity instantly",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Trace Your Coffee's
            <span className="block bg-gradient-coffee bg-clip-text text-transparent">
              Journey from Farm to Cup
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Blockchain-powered transparency for premium coffee supply chains.
            Every bean tells a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-coffee text-primary-foreground w-full sm:w-auto">
                View Dashboard
              </Button>
            </Link>
            <Link to="/create-batch">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Create Batch
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow bg-card border-border">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-coffee text-primary-foreground border-0">
            <CardContent className="p-8 md:p-12 text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Coffee Supply Chain?
              </h2>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                Connect your wallet and start creating traceable coffee batches today.
              </p>
              <Link to="/create-batch">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90 mt-4"
                >
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
