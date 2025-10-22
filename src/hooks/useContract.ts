import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/config/contract';
import { CoffeeBatch, StageUpdate, BatchStage } from '@/types/batch';
import { polygonAmoy } from '@/config/chains';

export function useReadBatch(batchId: number) {
  const { data: coreData, isLoading: coreLoading, error: coreError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getBatchCore',
    args: [BigInt(batchId)],
  });

  const { data: historyData, isLoading: historyLoading, error: historyError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getHistory',
    args: [BigInt(batchId)],
  });

  const isLoading = coreLoading || historyLoading;
  const error = coreError || historyError;

  if (!coreData || !historyData) {
    return { batch: null, isLoading, error };
  }

  const core = coreData as any;
  const history = historyData as any[];

  const batch: CoffeeBatch = {
    id: Number(core.batchId),
    origin: core.origin,
    variety: core.variety,
    farmer: core.farmer,
    currentStage: Number(core.currentStage) as BatchStage,
    createdAt: Number(core.harvestTimestamp) * 1000,
    history: history.map((record: any): StageUpdate => ({
      stage: Number(record.stage) as BatchStage,
      timestamp: Number(record.timestamp) * 1000,
      actor: record.actor,
      ipfsHash: record.metadataIpfsHash,
    })),
  };

  return { batch, isLoading, error };
}

export function useMintBatch() {
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const mintBatch = async (
    to: string,
    origin: string,
    variety: string,
    farmer: string,
    ipfsHash: string,
    harvestTimestamp: number
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mintBatch',
      args: [to as `0x${string}`, origin, variety, ipfsHash, BigInt(harvestTimestamp), farmer as `0x${string}`],
      account: address,
      chain: polygonAmoy,
    });
  };

  return {
    mintBatch,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

export function useUpdateStage() {
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const updateStage = async (batchId: number, stage: number, ipfsHash: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'appendStage',
      args: [BigInt(batchId), stage, ipfsHash],
      account: address,
      chain: polygonAmoy,
    });
  };

  return {
    updateStage,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}
