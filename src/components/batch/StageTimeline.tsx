import { motion } from "framer-motion";
import { StageUpdate, STAGE_NAMES } from "@/types/batch";
import { Check, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StageTimelineProps {
  history: StageUpdate[];
  currentStage: number;
}

export const StageTimeline = ({ history, currentStage }: StageTimelineProps) => {
  return (
    <div className="space-y-4">
      {STAGE_NAMES.map((stageName, index) => {
        const stageData = history.find((h) => h.stage === index);
        const isCompleted = index <= currentStage;
        const isCurrent = index === currentStage;

        return (
          <motion.div
            key={stageName}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <Card className={`p-4 ${isCurrent ? 'border-primary bg-accent/20' : 'bg-card'}`}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  {index < STAGE_NAMES.length - 1 && (
                    <div
                      className={`w-0.5 h-12 mt-2 transition-colors ${
                        isCompleted ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-foreground">{stageName}</h3>
                  {stageData && (
                    <>
                      <p className="text-sm text-muted-foreground">
                        {new Date(stageData.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        Actor: {stageData.actor.slice(0, 10)}...{stageData.actor.slice(-8)}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        IPFS: {stageData.ipfsHash.slice(0, 15)}...
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
