import { CoffeeBatch, BatchStage } from "@/types/batch";

// Mock data for development
export const mockBatches: CoffeeBatch[] = [
  {
    id: 1,
    origin: "Ethiopia, Yirgacheffe",
    variety: "Heirloom",
    farmer: "Ahmed Hassan",
    currentStage: BatchStage.Distributed,
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    history: [
      {
        stage: BatchStage.Harvested,
        timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000,
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        ipfsHash: "QmX4fQ9K7N8P2rT6vU3aS1dF5gH9jK6mN2oP1qR8tU4vW7",
      },
      {
        stage: BatchStage.Cured,
        timestamp: Date.now() - 25 * 24 * 60 * 60 * 1000,
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        ipfsHash: "QmY5gR0L8O9Q3sU7wV4bT2eG6iJ0kM3nO5pQ2rS9uV5xZ8",
      },
      {
        stage: BatchStage.Milled,
        timestamp: Date.now() - 20 * 24 * 60 * 60 * 1000,
        actor: "0x853e46Dd7745D0643036b5c955Fc0fBc0eC1aFd",
        ipfsHash: "QmZ6hS1M9P0R4tV8xW5cU3fH7jK1mN4oQ6qR3sT0vW6yA9",
      },
      {
        stage: BatchStage.Roasted,
        timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000,
        actor: "0x964f57Ee8856E0754147c6d066Gd1eDc1fD2Bge",
        ipfsHash: "QmA7iT2N0Q1S5uW9yX6dV4gI8kL2nO5pR7rS4tU1wX7zB0",
      },
      {
        stage: BatchStage.Packaged,
        timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000,
        actor: "0xa75g68Ff9967F1865258d7e177He2fEd2gE3Chf",
        ipfsHash: "QmB8jU3O1R2T6vX0zY7eW5hJ9lM3nP6qS8sT5uV2xY8aC1",
      },
      {
        stage: BatchStage.Distributed,
        timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
        actor: "0xb86h79Gg0a78G2976369e8f288If3gFe3hF4Dig",
        ipfsHash: "QmC9kV4P2S3U7wY1zA8fX6iK0mN4oQ7rT9tU6vW3yZ9bD2",
      },
    ],
  },
  {
    id: 2,
    origin: "Colombia, Huila",
    variety: "Castillo",
    farmer: "Maria Rodriguez",
    currentStage: BatchStage.Roasted,
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    history: [
      {
        stage: BatchStage.Harvested,
        timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000,
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        ipfsHash: "QmD0lW5Q3T4V8xZ2aB9gY7jL1nO5pR8sU0tV7wX4zA0cE3",
      },
      {
        stage: BatchStage.Cured,
        timestamp: Date.now() - 12 * 24 * 60 * 60 * 1000,
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        ipfsHash: "QmE1mX6R4U5W9yA3bC0hZ8kM2oP6qS9tV1uW8xY5zB1dF4",
      },
      {
        stage: BatchStage.Milled,
        timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000,
        actor: "0x853e46Dd7745D0643036b5c955Fc0fBc0eC1aFd",
        ipfsHash: "QmF2nY7S5V6X0zB4cD1iA9lN3pQ7rT0uW2vX9yZ6aC2eG5",
      },
      {
        stage: BatchStage.Roasted,
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        actor: "0x964f57Ee8856E0754147c6d066Gd1eDc1fD2Bge",
        ipfsHash: "QmG3oZ8T6W7Y1aC5dE2jB0mO4qR8sU1vX3wY0zA7bD3fH6",
      },
    ],
  },
  {
    id: 3,
    origin: "Guatemala, Antigua",
    variety: "Bourbon",
    farmer: "Carlos Mendez",
    currentStage: BatchStage.Cured,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    history: [
      {
        stage: BatchStage.Harvested,
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        ipfsHash: "QmH4pA9U7X8Z2bD6fF3kC1nP5rS9tV2wX4yA1zB8cE4gI7",
      },
      {
        stage: BatchStage.Cured,
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        ipfsHash: "QmI5qB0V8Y9A3cE7gG4lD2oQ6sT0uW3xY5zA2bC9dF5hJ8",
      },
    ],
  },
];

export const getMockBatch = (id: number): CoffeeBatch | undefined => {
  return mockBatches.find(batch => batch.id === id);
};

export const getAllMockBatches = (): CoffeeBatch[] => {
  return mockBatches;
};
