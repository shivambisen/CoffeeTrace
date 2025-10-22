import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Upload } from "lucide-react";
import { STAGE_NAMES } from "@/types/batch";
import { useReadBatch, useUpdateStage } from "@/hooks/useContract";

const UpdateStage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { batch, isLoading } = useReadBatch(Number(id));
  const { updateStage, isPending, isConfirming, isSuccess, error } = useUpdateStage();
  const [ipfsHash, setIpfsHash] = useState("");
  const [metadata, setMetadata] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Stage updated successfully!", {
        description: `Batch moved to ${STAGE_NAMES[nextStage]} stage.`,
      });
      navigate(`/batch/${id}`);
    }
  }, [isSuccess, navigate, id]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to update stage", {
        description: error.message,
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Loading batch...</h2>
        </div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Batch not found</h2>
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextStage = batch.currentStage + 1;
  const canUpdate = nextStage < STAGE_NAMES.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!ipfsHash.trim()) {
      toast.error("Please provide an IPFS hash");
      return;
    }

    await updateStage(batch.id, nextStage, ipfsHash);
  };

  if (!canUpdate) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container px-4 max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Batch Already Completed
          </h2>
          <p className="text-muted-foreground">
            This batch has reached the final stage and cannot be updated further.
          </p>
          <Link to={`/batch/${batch.id}`}>
            <Button variant="outline">View Batch Details</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 max-w-2xl mx-auto">
        <Link to={`/batch/${batch.id}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Batch
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Update Stage: {STAGE_NAMES[nextStage]}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Batch #{batch.id} - Moving from {STAGE_NAMES[batch.currentStage]} to{" "}
                {STAGE_NAMES[nextStage]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ipfsHash">IPFS Hash</Label>
                  <Input
                    id="ipfsHash"
                    placeholder="e.g., QmX4fQ9K7N8P2rT6vU3aS1dF5gH9jK6mN2oP1qR8tU4vW7"
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                    required
                    className="bg-background border-input font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload metadata to IPFS and paste the hash here
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metadata">Stage Metadata (JSON)</Label>
                  <Textarea
                    id="metadata"
                    placeholder={'{\n  "temperature": "25°C",\n  "humidity": "60%",\n  "notes": "Quality inspection passed"\n}'}
                    value={metadata}
                    onChange={(e) => setMetadata(e.target.value)}
                    rows={8}
                    className="bg-background border-input font-mono text-sm resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional: Add stage-specific metadata in JSON format
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <h4 className="font-semibold text-sm text-foreground mb-2">
                    Stage Requirements: {STAGE_NAMES[nextStage]}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {nextStage === 1 && "Document the curing process, duration, and conditions."}
                    {nextStage === 2 && "Record milling details, equipment used, and quality checks."}
                    {nextStage === 3 && "Log roasting profile, temperature, and roast level."}
                    {nextStage === 4 && "Document packaging details, weight, and batch codes."}
                    {nextStage === 5 && "Record distribution details, destination, and shipping info."}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/batch/${batch.id}`)}
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
                    <Upload className="h-4 w-4 mr-2" />
                    {isPending ? "Confirming..." : isConfirming ? "Processing..." : "Update Stage"}
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

export default UpdateStage;
