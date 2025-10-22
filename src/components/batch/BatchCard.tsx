import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CoffeeBatch, STAGE_NAMES } from "@/types/batch";
import { MapPin, User, Coffee } from "lucide-react";

interface BatchCardProps {
  batch: CoffeeBatch;
  index?: number;
}

export const BatchCard = ({ batch, index = 0 }: BatchCardProps) => {
  const progress = ((batch.currentStage + 1) / 6) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/batch/${batch.id}`}>
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-card border-border">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-foreground">Batch #{batch.id}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <Coffee className="h-3 w-3" />
                  {batch.variety}
                </CardDescription>
              </div>
              <Badge className="bg-accent text-accent-foreground">
                {STAGE_NAMES[batch.currentStage]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{batch.origin}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{batch.farmer}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-coffee"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
