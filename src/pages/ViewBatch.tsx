import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StageTimeline } from "@/components/batch/StageTimeline";
import { QRCodeCard } from "@/components/batch/QRCodeCard";
import { ArrowLeft, MapPin, User, Coffee, Calendar, Package } from "lucide-react";
import { BatchStage, STAGE_NAMES } from "@/types/batch";
import { useReadBatch } from "@/hooks/useContract";

const ViewBatch = () => {
  const { id } = useParams();
  const { batch, isLoading } = useReadBatch(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Package className="h-16 w-16 mx-auto text-muted-foreground animate-pulse" />
          <h2 className="text-2xl font-semibold text-foreground">Loading batch...</h2>
        </div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Package className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-semibold text-foreground">Batch not found</h2>
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = batch.currentStage === BatchStage.Distributed;
  const lastStageData = batch.history[batch.history.length - 1];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 max-w-6xl mx-auto space-y-6">
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Batch Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl text-foreground">
                      Batch #{batch.id}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                      Created {new Date(batch.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    {STAGE_NAMES[batch.currentStage]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-foreground">
                    <Coffee className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Variety</p>
                      <p className="font-medium">{batch.variety}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Origin</p>
                      <p className="font-medium">{batch.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <User className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Farmer</p>
                      <p className="font-medium">{batch.farmer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Stages</p>
                      <p className="font-medium">
                        {batch.currentStage + 1} of {STAGE_NAMES.length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Stage History</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Complete journey of this coffee batch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StageTimeline history={batch.history} currentStage={batch.currentStage} />
              </CardContent>
            </Card>
          </div>

          {/* QR Code Section */}
          <div className="space-y-6">
            {isCompleted && lastStageData && (
              <QRCodeCard batchId={batch.id} ipfsHash={lastStageData.ipfsHash} />
            )}

            {!isCompleted && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Next Steps</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complete remaining stages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This batch is currently at the{" "}
                    <span className="font-semibold text-foreground">
                      {STAGE_NAMES[batch.currentStage]}
                    </span>{" "}
                    stage.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    QR code will be available once the batch reaches the final stage
                    (Distributed).
                  </p>
                  <Link to={`/update-stage/${batch.id}`}>
                    <Button className="w-full bg-gradient-coffee text-primary-foreground">
                      Update Stage
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewBatch;
