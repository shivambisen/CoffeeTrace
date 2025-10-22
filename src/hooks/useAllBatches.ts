import { useState, useEffect } from 'react';
import { usePublicClient, useBlockNumber } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/config/contract';
import { polygonAmoy } from '@/config/chains';
import { CoffeeBatch, StageUpdate, BatchStage } from '@/types/batch';

export function useAllBatches() {
  const [batches, setBatches] = useState<CoffeeBatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const publicClient = usePublicClient({ chainId: polygonAmoy.id });
  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    const fetchBatches = async () => {
      if (!publicClient) return;

      try {
        setIsLoading(true);
        const fetchedBatches: CoffeeBatch[] = [];
        let batchId = 1; // start from batch ID 1
        while (true) {
          try {
            // @ts-ignore
            const core = (await publicClient.readContract({
              address: CONTRACT_ADDRESS,
              abi: CONTRACT_ABI,
              functionName: 'getBatchCore',
              args: [BigInt(batchId)],
            })) as any;

            // @ts-ignore
            const historyData = (await publicClient.readContract({
              address: CONTRACT_ADDRESS,
              abi: CONTRACT_ABI,
              functionName: 'getHistory',
              args: [BigInt(batchId)],
            })) as any[];

            const history: StageUpdate[] = historyData.map((record: any) => ({
              stage: Number(record.stage) as BatchStage,
              timestamp: Number(record.timestamp) * 1000,
              actor: record.actor,
              ipfsHash: record.metadataIpfsHash,
            }));

            fetchedBatches.push({
              id: Number(core.batchId),
              origin: core.origin,
              variety: core.variety,
              farmer: core.farmer,
              currentStage: Number(core.currentStage) as BatchStage,
              createdAt: Number(core.harvestTimestamp) * 1000,
              history,
            } as CoffeeBatch);

            batchId++; // fetch next batch
          } catch (err) {
            // Stop loop when batchId doesn't exist
            console.log(`No batch found for batchId ${batchId}, stopping fetch.`);
            break;
          }
        }

        // Sort newest first
        fetchedBatches.sort((a, b) => b.createdAt - a.createdAt);
        setBatches(fetchedBatches);
        setError(null);
      } catch (err) {
        console.error('Error fetching batches:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatches();
  }, [publicClient, blockNumber]);

  return { batches, isLoading, error };
}
