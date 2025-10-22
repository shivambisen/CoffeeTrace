import { motion } from "framer-motion";
import { BatchCard } from "@/components/batch/BatchCard";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useAllBatches } from "@/hooks/useAllBatches";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { batches, isLoading, error } = useAllBatches(); // now an array of batches

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Coffee Batches</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your coffee supply chain
            </p>
          </div>
          <Link to="/create-batch">
            <Button className="bg-gradient-coffee text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Batch
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Loader2 className="h-16 w-16 mx-auto text-accent animate-spin mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Loading batches...</h2>
            <p className="text-muted-foreground">Fetching data from the blockchain</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Error loading batches</h2>
            <p className="text-muted-foreground mb-6">{error.message}</p>
          </motion.div>
        ) : batches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No batches yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first coffee batch to get started
            </p>
            <Link to="/create-batch">
              <Button className="bg-gradient-coffee text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create First Batch
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch, index) => (
              <BatchCard key={batch.id} batch={batch} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
