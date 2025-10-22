import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";
import { WalletConnect } from "@/components/web3/WalletConnect";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Coffee className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">CoffeeTrace</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-primary text-muted-foreground">
            Home
          </Link>
          <Link to="/dashboard" className="transition-colors hover:text-primary text-muted-foreground">
            Dashboard
          </Link>
          <Link to="/create-batch" className="transition-colors hover:text-primary text-muted-foreground">
            Create Batch
          </Link>
        </nav>

        <WalletConnect />
      </div>
    </header>
  );
};
