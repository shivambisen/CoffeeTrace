import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Coffee } from "lucide-react";
import { BatchFormData } from "@/types/batch";
import { useMintBatch } from "@/hooks/useContract";

const CreateBatch = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { mintBatch, isPending, isConfirming, isSuccess, error } = useMintBatch();
  const [formData, setFormData] = useState<BatchFormData>({
    origin: "",
    variety: "",
    farmer: "",
    harvestDate: "",
    quantity: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Coffee batch created successfully!", {
        description: "Your batch has been registered on the blockchain.",
      });
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to create batch", {
        description: error.message,
      });
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    // Create a simple IPFS hash placeholder (you'll want to actually upload to IPFS)
    const metadata = {
      origin: formData.origin,
      variety: formData.variety,
      farmer: formData.farmer,
      harvestDate: formData.harvestDate,
      quantity: formData.quantity,
      notes: formData.notes,
    };
    const ipfsHash = `Qm${Math.random().toString(36).substring(2, 15)}...`; // Placeholder

    const harvestTimestamp = Math.floor(new Date(formData.harvestDate).getTime() / 1000);

    await mintBatch(
      address,
      formData.origin,
      formData.variety,
      formData.farmer || address,
      ipfsHash,
      harvestTimestamp
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Coffee className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground">Create Coffee Batch</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Register a new coffee batch on the blockchain
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      name="origin"
                      placeholder="e.g., Ethiopia, Yirgacheffe"
                      value={formData.origin}
                      onChange={handleChange}
                      required
                      className="bg-background border-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="variety">Variety</Label>
                    <Input
                      id="variety"
                      name="variety"
                      placeholder="e.g., Heirloom, Bourbon"
                      value={formData.variety}
                      onChange={handleChange}
                      required
                      className="bg-background border-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmer">Farmer Name</Label>
                  <Input
                    id="farmer"
                    name="farmer"
                    placeholder="e.g., Ahmed Hassan"
                    value={formData.farmer}
                    onChange={handleChange}
                    required
                    className="bg-background border-input"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date</Label>
                    <Input
                      id="harvestDate"
                      name="harvestDate"
                      type="date"
                      value={formData.harvestDate}
                      onChange={handleChange}
                      required
                      className="bg-background border-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="e.g., 500"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className="bg-background border-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any additional information about the batch..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background border-input resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                    disabled={isPending || isConfirming}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-coffee text-primary-foreground"
                    disabled={isPending || isConfirming || !isConnected}
                  >
                    {isPending ? "Confirming..." : isConfirming ? "Processing..." : "Create Batch"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBatch;
