export enum BatchStage {
  Harvested = 0,
  Cured = 1,
  Milled = 2,
  Roasted = 3,
  Packaged = 4,
  Distributed = 5,
}

export const STAGE_NAMES = [
  "Harvested",
  "Cured",
  "Milled",
  "Roasted",
  "Packaged",
  "Distributed",
] as const;

export interface StageUpdate {
  stage: BatchStage;
  timestamp: number;
  actor: string;
  ipfsHash: string;
  metadata?: Record<string, any>;
}

export interface CoffeeBatch {
  id: number;
  origin: string;
  variety: string;
  farmer: string;
  currentStage: BatchStage;
  history: StageUpdate[];
  createdAt: number;
}

export interface BatchFormData {
  origin: string;
  variety: string;
  farmer: string;
  harvestDate: string;
  quantity: string;
  notes: string;
}
